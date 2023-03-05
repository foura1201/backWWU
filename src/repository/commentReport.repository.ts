import CommentReport from 'src/entity/commentReport.entity';
import { CustomRepository } from 'src/lib/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(CommentReport)
export class CommentReportRepository extends Repository<CommentReport> {}
