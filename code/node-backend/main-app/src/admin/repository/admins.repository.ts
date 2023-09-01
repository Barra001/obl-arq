import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { Admin } from "../entities/admins.entity";
import { AdminsRepositoryInterface } from "./admins.repository.interface";

export class AdminsRepository extends EntityRepository<Admin> implements AdminsRepositoryInterface {
  constructor(AdminModel: Model<Admin>) {
    super(AdminModel);
  }
}
