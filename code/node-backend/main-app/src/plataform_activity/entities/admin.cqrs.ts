import { MainCqrs } from "./main.cqrs";

export class AdminCqrs extends MainCqrs {
  constructor(public gameName: string, public mail: string) {
    super(gameName);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public static fromDoc(doc: any): AdminCqrs {
    return new AdminCqrs(doc?.eventName ?? "", doc?.mail ?? "");
  }
}
