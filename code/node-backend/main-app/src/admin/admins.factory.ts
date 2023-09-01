import { AdminsRepository } from "./repository/admins.repository";
import { AdminModel } from "./entities/admins.entity";
import { AdminsService } from "./service/admins.service";
import { AdminsServiceInterface } from "./service/admins.service.interface";
import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";
import { PlataformActivitiesServiceInterface } from "src/plataform_activity/service/plataform_activities.service.interface";

export class AdminsFactory {
  static create(
    encryptionService: EncryptionServiceInterface,
    plataformActivityService: PlataformActivitiesServiceInterface
  ): AdminsServiceInterface {
    const adminsRepository = new AdminsRepository(AdminModel);
    const adminService = new AdminsService(
      adminsRepository,
      encryptionService,
      plataformActivityService
    );
    return adminService;
  }
}
