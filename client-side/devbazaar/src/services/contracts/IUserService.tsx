import { IUser } from "../../models/contracts";

export interface IUserService
{
    loginAsync (email: string, password: string): Promise<string>;
    registerAsync (data: IUser): Promise<string>;
    updateAsync (data: IUser): Promise<void>;
    fetchRoleData (): Promise<any>;
}