import { ActivityType, Collection } from "../entities/cqrs-event";
import { MainCqrs } from "../entities/main.cqrs";
import { PlataformActivity } from "../entities/plataform_activities.entity";
import { PlataformActivityInvalidDateRange } from "../plataform_activities.exceptions";
import { PlataformActivitiesRepositoryInterface } from "../repository/plataform_activities.repository.interface";
import { PlataformActivitiesServiceInterface } from "./plataform_activities.service.interface";
export class PlataformActivitiesService
  implements PlataformActivitiesServiceInterface
{
  constructor(
    private readonly plataformActivitiesRepository: PlataformActivitiesRepositoryInterface
  ) {}

  async create(
    document: MainCqrs,
    userResponsible: string,
    type: ActivityType,
    collectionName: Collection
  ): Promise<void> {
    const plataformActivity = PlataformActivity.create(
      type,
      new Date(),
      document,
      userResponsible,
      collectionName
    );

    await this.plataformActivitiesRepository.create(plataformActivity);
  }

  private ValidateDates(dateFrom: Date, dateTo: Date): void {
    if (!dateFrom || !dateTo) throw new PlataformActivityInvalidDateRange();
    if (dateFrom > dateTo) throw new PlataformActivityInvalidDateRange();
  }
  async getActivitiesWithinRange(
    dateFrom: Date,
    dateTo: Date
  ): Promise<PlataformActivity[]> {
    this.ValidateDates(dateFrom, dateTo);
    return await this.plataformActivitiesRepository.getActivitiesWithinRange(
      dateFrom,
      dateTo
    );
  }
}
