import { Admin } from "../entities/admins.entity";
import {
  AdminAlreadyExistsException,
  AdminInvalidName,
  AdminInvalidPassword,
  AdminInvalidMail,
} from "../admins.exceptions";
import { MIN_LENGTH_PASSWORD, MIN_LENGTH_USERNAME } from "../admins.consts";
import { AdminsRepositoryInterface } from "../repository/admins.repository.interface";
import { AdminsServiceInterface } from "./admins.service.interface";
import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";
import { PlataformActivitiesServiceInterface } from "./../../plataform_activity/service/plataform_activities.service.interface";
import { AdminCqrs } from "./../../plataform_activity/entities/admin.cqrs";
import {
  ActivityType,
  Collection,
} from "./../../plataform_activity/entities/cqrs-event";

export class AdminsService implements AdminsServiceInterface {
  constructor(
    private readonly adminsRepository: AdminsRepositoryInterface,
    private readonly encryptionService: EncryptionServiceInterface,
    private readonly plataformActivitiesService: PlataformActivitiesServiceInterface
  ) {}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validateAdmin(admin: Admin): void {
    if (!admin.username || admin.username.length < MIN_LENGTH_USERNAME)
      throw new AdminInvalidName();
    if (!admin.password || admin.password.length < MIN_LENGTH_PASSWORD)
      throw new AdminInvalidPassword();
    if (!admin.mail || !this.validateEmail(admin.mail))
      throw new AdminInvalidMail();
  }

  async create(admin: Admin, adminResponsible: string): Promise<Admin> {
    this.validateAdmin(admin);
    const adminExists = await this.adminsRepository.exists({
      username: admin.username,
    });
    if (adminExists) throw new AdminAlreadyExistsException();
    admin.password = await this.encryptionService.hashPassword(admin.password);
    await this.plataformActivitiesService.create(
      new AdminCqrs("", admin.username),
      adminResponsible,
      ActivityType.creation,
      Collection.admins
    );
    return await this.adminsRepository.create(admin);
  }

  async getAll(): Promise<Admin[]> {
    return await this.adminsRepository.getAll();
  }
}
