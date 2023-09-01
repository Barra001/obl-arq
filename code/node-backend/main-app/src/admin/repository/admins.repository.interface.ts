import { AnyKeys, AnyObject } from "mongoose";
import { Admin } from "../entities/admins.entity";

export interface AdminsRepositoryInterface {
    create(data: AnyKeys<Admin> & AnyObject): Promise<Admin>;
    exists(filters): Promise<boolean>;
    getAll(): Promise<Admin[]>;
}
