import HttpException from "./HttpException";
export default class UnauthorizedNoTokenException extends HttpException {
  constructor() {
    super(401, `Unauthorized, no token`);
  }
}
