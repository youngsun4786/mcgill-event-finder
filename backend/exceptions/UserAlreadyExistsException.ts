import HttpException from "./HttpException";

export default class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(400, `User already exists`);
  }
}
