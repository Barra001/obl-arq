import { Request, Response } from "express";
import { AdminsServiceInterface } from "./service/admins.service.interface";
import { Role } from "./../auth/entities/auth.payload";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
import { User } from "src/auth/entities/auth.entity";
import { Admin } from "./entities/admins.entity";

export class AdminsController {
  constructor(
    private readonly adminsService: AdminsServiceInterface,
    private readonly authService: AuthServiceInterface
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    const payload = await this.authService.verifyRequestForRoles(req, [
      Role.ADMIN,
    ]);
    const data: Admin = req.body;
    const admin = await this.adminsService.create(data, payload.username);
    res.send(admin);
  }

  async logIn(req: Request, res: Response): Promise<void> {
    const user: User = req.body;
    const token = await this.authService.logInUser(user, Role.ADMIN);
    res.json({ token: token });
  }
}
