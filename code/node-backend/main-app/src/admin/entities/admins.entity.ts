import { Types, Document, Schema, model } from "mongoose";

export class Admin extends Document {
  public id: Types.ObjectId;

  public username: string;

  public password: string;

  public mail: string;

  constructor(userName: string, password: string, mail: string) {
    super();
    this.username = userName;
    this.password = password;
    this.mail = mail;
  }
}

export const AdminSchema = new Schema<Admin>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  mail: { type: String, required: true },
});

export const AdminModel = model<Admin>("Admin", AdminSchema);
