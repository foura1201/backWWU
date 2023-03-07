import Recruit from 'src/entity/recruit.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {
  findByNickname(nickname: string) {
    console.log('아아');
    return this.createQueryBuilder('recruit')
      .select('id')
      .leftJoin('recruit', 'user')
      .where('user.nickname = :nickname', { nickname })
      .getMany();
  }

  findByRecruitName(recruitName: string) {
    console.log('아아아아');
    return this.createQueryBuilder('recruit')
      .select('id')
      .where('recruitName = :recruitName', { recruitName })
      .getMany();
  }
}
