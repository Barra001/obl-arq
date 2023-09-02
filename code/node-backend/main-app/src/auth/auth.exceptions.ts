import { AppException } from "./../exception_filter/app.exception";

export class UndefinedRoleException extends AppException {
  constructor() {
    super(400, "Role was not defined");
  }
}

export class UndefinedUserException extends AppException {
  constructor() {
    super(400, "User was not defined");
  }
}

export class NoTokenPresentException extends AppException {
  constructor() {
    super(401, "No user token found on request");
  }
}

export class UserNotExistsException extends AppException {
  constructor() {
    super(401, "Invalid user credentials");
  }
}
export class NotEnoughPrivilegesException extends AppException {
  constructor() {
    super(403, "User does not have enough privileges");
  }
}

export class InvalidTokenException extends AppException {
  constructor() {
    super(401, "Invalid token");
  }
}