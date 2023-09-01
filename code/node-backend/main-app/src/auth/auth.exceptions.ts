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

export class ExternalAuthApiError extends AppException {
  constructor() {
    super(500, "Unknown auth API Error");
  }
}

export class UserNotExistsException extends AppException {
  constructor() {
    super(401, "Invalid user credentials");
  }
}
