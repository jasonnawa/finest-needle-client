import { User } from "../users/userTypes";
export interface CreateMatchDTO {
    userOne: string;
    userTwo: string;
}

export interface Match {
  userOne: User;
  userTwo: User;
}
