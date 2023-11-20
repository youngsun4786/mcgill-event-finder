import HttpException from "./HttpException";
export default class UnauthorizedInvalidTokenException extends HttpException {
  constructor() {
    super(401, `Unauthorized, invalid token`);
  }
}
