import { EntityRepository, Repository } from "typeorm";
import { Recruit } from "./recruit.entity";

@EntityRepository(Recruit)
export class RecruitRepository extends Repository<Recruit> {}