import { IUser } from "../../models/contracts";

export interface IUserService
{
    updateAsync (data: IUser): Promise<void>;
    fetchRoleData (): Promise<any>;
}