import { AxiosResponse } from "axios";
import { IUser } from "../../models/contracts";

export interface IUserService
{
    updateAsync (data: IUser): Promise<AxiosResponse<any>>;
    fetchRoleData (): Promise<AxiosResponse<any>>;
}