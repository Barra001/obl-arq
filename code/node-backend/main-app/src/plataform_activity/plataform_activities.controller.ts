import { Request, Response } from "express";
import { PlataformActivitiesServiceInterface } from "./service/plataform_activities.service.interface";
import { PlataformActivity } from "./entities/plataform_activities.entity";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
import { Role } from "./../auth/entities/auth.payload";

export class PlataformActivitiesController {
  constructor(
    private readonly plataformActivitiesService: PlataformActivitiesServiceInterface,
    private readonly authService: AuthServiceInterface
  ) {
    this.plataformActivitiesService = plataformActivitiesService;
    this.authService = authService;
  }

  async getAll(req: Request, res: Response): Promise<void> {
    await this.authService.verifyRequestForRoles(req, [Role.ADMIN]);
    const dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    const orders: PlataformActivity[] =
      await this.plataformActivitiesService.getActivitiesWithinRange(
        dateFrom,
        dateTo
      );
    res.send(orders);
  }
}
