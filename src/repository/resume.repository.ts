import Resume from 'src/entity/resume.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(Resume)
export class ResumeRepository extends Repository<Resume> {}
