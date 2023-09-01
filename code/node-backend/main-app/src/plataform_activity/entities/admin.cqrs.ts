import { MainCqrs } from "./main.cqrs";

export class AdminCqrs extends MainCqrs {
  constructor(public eventName: string, public username: string) {
    super(eventName);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public static fromDoc(doc: any): AdminCqrs {
    return new AdminCqrs(doc?.eventName ?? "", doc?.username ?? "");
  }
}
