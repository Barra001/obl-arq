import { PlataformActivity } from "../entities/plataform_activities.entity";

export interface PlataformActivitiesRepositoryInterface {
  create(data: PlataformActivity): Promise<PlataformActivity>;
  getActivitiesWithinRange(
    dateFrom: Date,
    dateTo: Date
  ): Promise<PlataformActivity[]>;
}
