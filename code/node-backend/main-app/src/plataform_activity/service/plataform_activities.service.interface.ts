import { ActivityType, Collection } from "../entities/cqrs-event";
import { MainCqrs } from "../entities/main.cqrs";
import { PlataformActivity } from "../entities/plataform_activities.entity";

export interface PlataformActivitiesServiceInterface {
  getActivitiesWithinRange(
    dateFrom: Date,
    dateTo: Date
  ): Promise<PlataformActivity[]>;
  create(
    document: MainCqrs,
    userResponsible: string,
    type: ActivityType,
    collectionName: Collection
  ): Promise<void>;
}
