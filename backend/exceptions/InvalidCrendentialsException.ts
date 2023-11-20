import HttpException from "./HttpException";
export default class InvalidCredentialsException extends HttpException {
  constructor() {
    super(401, `Invalid credentials provided`);
  }
}
