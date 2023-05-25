export interface IUser {
  id: number;
  userName: string;
  role: string;
  email: string;
  password: string;
}

export type LoginType = {
  message: string;
  token: string;
};
