import { AuthRepositoryInterface } from "./auth.repository.ineterface";
import { User } from "../entities/auth.entity";
import { Role } from "../entities/auth.payload";
import mongoose from "mongoose";
export class AuthRepository implements AuthRepositoryInterface {
  async getUser(user: User, role: Role): Promise<User> {
    const collectionName = role.toLowerCase() + "s";
    const collection = await mongoose.connection.db.collection<User>(
      collectionName
    );
    const dbUser = await collection.findOne({
      username: user.username,
    });
    return dbUser;
  }
}
