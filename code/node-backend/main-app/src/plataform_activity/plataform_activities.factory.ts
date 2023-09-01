import { PlataformActivitiesRepository } from "./repository/plataform_activities.repository";
import { PlataformActivityModel } from "./entities/plataform_activities.entity";
import { PlataformActivitiesService } from "./service/plataform_activities.service";
import { PlataformActivitiesServiceInterface } from "./service/plataform_activities.service.interface";

export class PlataformActivitiesFactory {
  static create(): PlataformActivitiesServiceInterface {
    const plataformActivitiesRepository = new PlataformActivitiesRepository(
      PlataformActivityModel
    );
    const plataformActivityService = new PlataformActivitiesService(
      plataformActivitiesRepository
    );
    return plataformActivityService;
  }
}
