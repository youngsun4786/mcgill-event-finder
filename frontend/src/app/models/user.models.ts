export enum UserType {
  STUDENT = 'student',
  PROFESSOR = 'professor',
  STAFF = 'staff',
}

export type User = {
  name: string;
  email: string;
  password: string;
  role: UserType;
}
