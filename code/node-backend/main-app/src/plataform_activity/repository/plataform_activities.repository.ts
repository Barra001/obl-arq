import { Model } from "mongoose";
import { EntityRepository } from "../../database/entity.repository";
import { PlataformActivity } from "../entities/plataform_activities.entity";
import { PlataformActivitiesRepositoryInterface } from "./plataform_activities.repository.interface";
import { Collection } from "../entities/cqrs-event";

export class PlataformActivitiesRepository
  extends EntityRepository<PlataformActivity>
  implements PlataformActivitiesRepositoryInterface
{
  constructor(PlataformActivityModel: Model<PlataformActivity>) {
    super(PlataformActivityModel);
  }

  async getActivitiesWithinRange(
    dateFrom: Date,
    dateTo: Date
  ): Promise<PlataformActivity[]> {
    const allActivities = await this.getAll();
    const dateFromToInt = new Date(dateFrom).getTime();
    const dateToToInt = new Date(dateTo).getTime();

    return new Promise<PlataformActivity[]>((resolve) => {
      const activitiesWithinRange = allActivities.filter((activity) => {
        const activityDate = activity.datetime.getTime();
        const activityCollection = activity.collectionName;
        return (
          activityDate >= dateFromToInt &&
          activityDate <= dateToToInt &&
          (activityCollection == Collection.events ||
            activityCollection == Collection.subscriptions)
        );
      });
      resolve(activitiesWithinRange);
    });
  }
}
