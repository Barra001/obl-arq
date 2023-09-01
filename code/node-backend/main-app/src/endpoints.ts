import { AppExceptionFilter } from "./exception_filter/exception.filter";
import { AdminsFactory } from "./admin/admins.factory";

import { PlataformActivitiesFactory } from "./plataform_activity/plataform_activities.factory";
import { AppRouterWrapper } from "./router.wrapper";

import { AdminsController } from "./admin/admins.controller";

import { PlataformActivitiesController } from "./plataform_activity/plataform_activities.controller";

import { EncryptionFactory } from "./encryption/encryption.factory";
import { AuthFactory } from "./auth/auth.factory";

export function initEndpoints(): AppRouterWrapper {
  const RouterWrapper = new AppRouterWrapper(AppExceptionFilter.catch);
  const encryptionService = EncryptionFactory.create();
  const authService = AuthFactory.create(encryptionService);
  const plataformActivityService = PlataformActivitiesFactory.create();

  const adminService = AdminsFactory.create(
    encryptionService,
    plataformActivityService
  );

  const adminController = new AdminsController(adminService, authService);

  const plataformActivityController = new PlataformActivitiesController(
    plataformActivityService,
    authService
  );

  /*----------------------ADMINS----------------------*/
  RouterWrapper.post("/admins", (req, res) =>
    adminController.register(req, res)
  );

  RouterWrapper.post("/admins/login", (req, res) =>
    adminController.logIn(req, res)
  );

  /*----------------------PLATAFORM_ACTIVITIES----------------------*/
  RouterWrapper.get("/plataform_activities", (req, res) =>
    plataformActivityController.getAll(req, res)
  );

  return RouterWrapper;
}
