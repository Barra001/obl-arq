import { Types, Document, Schema, model } from "mongoose";
import { ActivityType, Collection } from "./cqrs-event";
import { MainCqrs } from "./main.cqrs";

export class PlataformActivity extends Document {
  public id: Types.ObjectId;

  public activityType: ActivityType;

  public collectionName: Collection;

  public userResponsible: string;

  public datetime: Date;

  public doc: MainCqrs;

  constructor(
    activityType: ActivityType,
    datetime: Date,
    document: MainCqrs,
    userResponsible: string,
    collectionName: Collection
  ) {
    super();
    this.activityType = activityType;
    this.userResponsible = userResponsible;
    this.datetime = datetime;
    this.doc = document;
    this.collectionName = collectionName;
  }

  public static create(
    activityType: ActivityType,
    datetime: Date,
    document: MainCqrs,
    userResponsible: string,
    collectionName: Collection
  ): PlataformActivity {
    return {
      activityType: activityType,
      datetime: datetime,
      doc: document,
      userResponsible: userResponsible,
      collectionName: collectionName,
    } as PlataformActivity;
  }
}

export const PlataformActivitySchema = new Schema<PlataformActivity>({
  activityType: {
    type: String,
    enum: ["creation", "modification"],
    required: true,
  },
  collectionName: {
    type: String,
    enum: [
      "events",
      "suppliers",
      "admins",
      "purchases",
      "clients",
      "subscriptions",
      "videoAccess",
      "authorizations",
      "messages",
    ],
    required: true,
  },
  userResponsible: { type: String, required: true },
  datetime: { type: Date, required: true },
  doc: { type: Object, required: true },
});

export const PlataformActivityModel = model<PlataformActivity>(
  "PlataformActivity",
  PlataformActivitySchema
);
