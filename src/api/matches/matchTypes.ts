import { User } from "../users/userTypes";
export interface CreateMatchDTO {
    userOne: string;
    userTwo: string;
}

export interface Match {
  _id: string;
  userOne: User;
  userTwo: User;
}
