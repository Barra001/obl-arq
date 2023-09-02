import { Types, Document, Schema, model } from "mongoose";

export class Admin extends Document {
  public id: Types.ObjectId;

  public password: string;

  public mail: string;

  constructor(userName: string, password: string, mail: string) {
    super();
    this.password = password;
    this.mail = mail;
  }
}

export const AdminSchema = new Schema<Admin>({
  password: { type: String, required: true },
  mail: { type: String, required: true },
});

export const AdminModel = model<Admin>("Admin", AdminSchema);
