import { AxiosResponse } from "axios";
import { IUser } from "../../models/contracts";

export interface IUserService
{
    update (data: IUser): Promise<AxiosResponse<any>>;
}