import PostReport from 'src/entity/postReport.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(PostReport)
export class PostReportRepository extends Repository<PostReport> {}
