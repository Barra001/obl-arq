import { AppException } from "./../exception_filter/app.exception";

export class AdminAlreadyExistsException extends AppException {
  constructor() {
    super(409, "Admin already exists");
  }
}

export class AdminInvalidPassword extends AppException {
  constructor() {
    super(400, "Admin Invalid Password");
  }
}

export class AdminInvalidMail extends AppException {
  constructor() {
    super(400, 'Admin Invalid Mail',);
  }
}
