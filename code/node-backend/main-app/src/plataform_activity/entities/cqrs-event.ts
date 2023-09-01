import { MainCqrs } from "./main.cqrs";

export enum ActivityType {
  creation = "creation",
  modification = "modification",
}

export enum Collection {
  events = "events",
  subscriptions = "subscriptions",
  videoAccess = "videoAccess",
  suppliers = "suppliers",
  clients = "clients",
  authorizations = "authorizations",
  messages = "messages",
  admins = "admins",
}

export class CqrsEvent {
  constructor(
    public readonly operation: ActivityType,
    public readonly collection: Collection,
    public readonly userResponsible: string,
    public readonly document: MainCqrs
  ) {}
}
