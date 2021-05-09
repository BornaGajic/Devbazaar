import { IUser } from "../../models/contracts";

export interface IAuthService
{
    loginAsync (email: string, password: string): Promise<string>;
    registerAsync (data: IUser): Promise<string>;
}