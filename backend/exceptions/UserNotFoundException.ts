import HttpException from "./HttpException";

export default class UserNotFoundException extends HttpException {
  constructor() {
    super(404, `User not found!`);
  }
}
