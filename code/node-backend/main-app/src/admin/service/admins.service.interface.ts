import { Admin } from "../entities/admins.entity";

export interface AdminsServiceInterface {
  create(admin: Admin, adminResponsible: string, gameName: string): Promise<Admin>;
  getAll(): Promise<Admin[]>;
}
