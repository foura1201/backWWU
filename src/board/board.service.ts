import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import PostDto from 'src/dto/post.dto';
import User from 'src/entity/user.entity';
import { PostType, UserType } from 'src/lib/enumeration/enum';
import ServiceResult from 'src/lib/serviceResult';
import { PostRepository } from 'src/repository/post.repository';

@Injectable()
export class BoardService {
  constructor(private postRepository: PostRepository) {}

  async getAllPost(): Promise<ServiceResult> {
    try {
      const data = await this.postRepository.find();
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
      const data = await this.postRepository.findOneBy({ id: id });
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
}
