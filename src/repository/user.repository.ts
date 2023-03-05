import User from 'src/entity/user.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
