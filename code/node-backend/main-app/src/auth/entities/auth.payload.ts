export enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  SUPPLIER = "SUPPLIER",
}

export class AuthPayload {
  constructor(username: string, password: string, role: Role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
  public role: Role;
  public username: string;
  public password: string;
}
