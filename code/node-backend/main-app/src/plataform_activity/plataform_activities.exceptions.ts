import { AppException } from "./../exception_filter/app.exception";

export class PlataformActivityInvalidDateRange extends AppException {
  constructor() {
    super(400, "Invalid date range");
  }
}
