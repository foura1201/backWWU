import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CommentDto from 'src/dto/comment.dto';
import PostDto from 'src/dto/post.dto';
import PostLike from 'src/entity/postLike.entity';
import User from 'src/entity/user.entity';
import Comment from 'src/entity/comment.entity';
import { PostType, UserType } from 'src/lib/enumeration/enum';
import ServiceResult from 'src/lib/serviceResult';
import { CommentRepository } from 'src/repository/comment.repository';
import { CommentReportRepository } from 'src/repository/commentReport.repository';
import { PostRepository } from 'src/repository/post.repository';
import { PostLikeRepository } from 'src/repository/postLike.repository';
import { PostReportRepository } from 'src/repository/postReport.repository';
import { UserRepository } from 'src/repository/user.repository';
import ReportDto from 'src/dto/commentReport.dto';
import PostReport from 'src/entity/postReport.entity';
import CommentReport from 'src/entity/commentReport.entity';
import PostReportDto from 'src/dto/postReport';
import CommentReportDto from 'src/dto/commentReport.dto';

@Injectable()
export class BoardService {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
    private commentRepository: CommentRepository,
    private postLikeRepository: PostLikeRepository,
    private postReportRepository: PostReportRepository,
    private commentReportRepository: CommentReportRepository,
  ) {}

  async getAllPost(): Promise<ServiceResult> {
    try {
      const data = await this.postRepository.find({
        relations: { person: true },
      });
      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
        data: data,
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPost(id: number): Promise<ServiceResult> {
    try {
      const post = await this.postRepository.findOne({
        relations: { person: true },
        where: { id: id },
      });

      post.views += 1;

      const comments = await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.person', 'user')
        .leftJoin('comment.post', 'post')
        .where('post.id = :id', { id: id })
        .getMany();

      const likes = await this.postLikeRepository.count();

      const newData = await this.postRepository.create({
        id: id,
        person: post.person,
        postType: PostType.work,
        title: post.title,
        contents: post.contents,
        views: post.views,
      });

      await this.postRepository.update({ id: id }, newData);

      const data = {
        post,
        comments,
        likes,
      };

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
        data: [data],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async increaseView(id: number): Promise<ServiceResult> {
    try {
      const data = await this.postRepository.findOneBy({ id: id });

      const newData = await this.postRepository.create({
        id: id,
        person: data.person,
        postType: PostType.work,
        title: data.title,
        contents: data.contents,
        views: data.views + 1,
      });

      await this.postRepository.update({ id: id }, newData);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createPost(postDto: PostDto, user: User): Promise<ServiceResult> {
    try {
      if (user.userType === UserType.business) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'UnAuthorized',
        };
        return serviceResult;
      }
      const newPost = await this.postRepository.create({
        person: user,
        postType: PostType.work,
        title: postDto.title,
        contents: postDto.contents,
      });

      await this.postRepository.insert(newPost);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async modifyPost(
    id: number,
    postDto: PostDto,
    user: User,
  ): Promise<ServiceResult> {
    try {
      if (user.userType === UserType.business) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'UnAuthorized',
        };
        return serviceResult;
      }

      const myPost = await this.postRepository.findOne({
        relations: { person: true },
        where: { id: id },
      });

      if (myPost.person.id !== user.id) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'UnAuthorized',
        };
        return serviceResult;
      }

      const newPost = await this.postRepository.create({
        id: id,
        person: user,
        postType: PostType.work,
        title: postDto.title,
        contents: postDto.contents,
        // writedAt: myPost.writedAt,
      });

      await this.postRepository.update({ id: id }, newPost);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deletePost(id: number, user: User): Promise<ServiceResult> {
    try {
      const data = await this.postRepository.findOne({
        relations: { person: true },
        where: { id: id },
      });

      if (data === null) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: 'Bad Request',
        };
        return serviceResult;
      }

      if (data.person.id !== user.id) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'UnAuthorized',
        };
        return serviceResult;
      }

      await this.postRepository.delete({ id });

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async likePost(id: number, person: User): Promise<ServiceResult> {
    try {
      const post = id;
      const like = new PostLike();
      const likeExist = await this.postLikeRepository
        .createQueryBuilder('postLike')
        .leftJoinAndSelect('postLike.person', 'user')
        .leftJoinAndSelect('postLike.post', 'post')
        .where('postLike.personId = :a', { a: person.id })
        .andWhere('postLike.postId = :b', { b: post })
        .getMany();
      if (likeExist.length) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: 'like is already exists',
        };
        return serviceResult;
      }

      like.person = await this.userRepository.findOne({
        where: { id: person.id },
      });
      like.post = await this.postRepository.findOne({
        where: { id: post },
      });

      await this.postLikeRepository.insert(like);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'success!',
        data: [like],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생하였습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async canclePostLike(id: number, person: User): Promise<ServiceResult> {
    try {
      const post = id;
      const deleteId = await this.postLikeRepository
        .createQueryBuilder('postLike')
        .leftJoinAndSelect('postLike.person', 'user')
        .leftJoinAndSelect('postLike.post', 'post')
        .where('postLike.person = :a', { a: person.id })
        .andWhere('postLike.post = :b', { b: post })
        .getOne();
      await this.postLikeRepository.delete(deleteId.id);
      const serviceResult: ServiceResult = {
        code: 200,
        message: 'success!',
        data: [],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생하였습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getComment(postId: number): Promise<ServiceResult> {
    try {
      const comments = await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoin('comment.post', 'post')
        .where('post.id = :id', { id: postId })
        .getMany();

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success',
        data: [comments],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createComment(
    commentDto: CommentDto,
    user: User,
  ): Promise<ServiceResult> {
    try {
      if (user.userType === UserType.business) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'UnAuthorized',
        };
        return serviceResult;
      }

      const post = await this.postRepository.findOne({
        where: { id: commentDto.postId },
      });

      const newComment = new Comment();
      newComment.comment = commentDto.comment;
      newComment.post = post;
      newComment.person = user;

      await this.commentRepository.insert(newComment);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteComment(id: number, person: User): Promise<ServiceResult> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: id },
        relations: { person: true },
      });
      if (comment.person.id !== person.id) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: 'Unauthorized',
        };
        return serviceResult;
      }
      await this.commentRepository.delete(id);
      const serviceResult: ServiceResult = {
        code: 200,
        message: 'success!',
        data: [],
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(
        '알 수 없는 오류가 발생하였습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async reportPost(
    reportDto: PostReportDto,
    user: User,
  ): Promise<ServiceResult> {
    try {
      if (user.userType === UserType.business) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'UnAuthorized',
        };
        return serviceResult;
      }

      const post = await this.postRepository.findOne({
        where: { id: reportDto.postId },
      });

      const reportExist = await this.postReportRepository
        .createQueryBuilder('postReport')
        .leftJoinAndSelect('postReport.person', 'user')
        .leftJoinAndSelect('postReport.post', 'post')
        .where('postReport.person = :a', { a: user.id })
        .andWhere('postReport.post = :b', { b: post.id })
        .getMany();

      if (reportExist.length) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: 'Report is already exist.',
        };
        return serviceResult;
      }

      const newReport = new PostReport();
      newReport.reportType = reportDto.reportType;
      newReport.post = post;
      newReport.person = user;

      await this.postReportRepository.insert(newReport);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async reportComment(
    reportDto: CommentReportDto,
    user: User,
  ): Promise<ServiceResult> {
    try {
      if (user.userType === UserType.business) {
        const serviceResult: ServiceResult = {
          code: 401,
          message: 'UnAuthorized',
        };
        return serviceResult;
      }

      const comment = await this.commentRepository.findOne({
        where: { id: reportDto.commentId },
      });

      const reportExist = await this.commentReportRepository
        .createQueryBuilder('commentReport')
        .leftJoinAndSelect('commentReport.person', 'user')
        .leftJoinAndSelect('commentReport.comment', 'comment')
        .where('commentReport.person = :a', { a: user.id })
        .andWhere('commentReport.comment = :b', { b: comment.id })
        .getMany();

      if (reportExist.length) {
        const serviceResult: ServiceResult = {
          code: 400,
          message: 'Report is already exist.',
        };
        return serviceResult;
      }

      const newReport = new CommentReport();
      newReport.reportType = reportDto.reportType;
      newReport.comment = comment;
      newReport.person = user;

      await this.commentReportRepository.insert(newReport);

      const serviceResult: ServiceResult = {
        code: 200,
        message: 'Success!',
      };
      return serviceResult;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
