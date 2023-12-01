export enum UserType {
  STUDENT = 'student',
  PROFESSOR = 'professor',
  STAFF = 'staff',
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: UserType;
}
