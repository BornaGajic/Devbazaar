import { UserRole } from "../../common";

export interface IUser
{
    username?: string,
    email?: string,
    password?: string,
    role?: UserRole,
    logo?: string
}