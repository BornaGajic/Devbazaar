import { AxiosResponse } from "axios";
import { UserRole } from "../../common";
import { IUser } from "../../models/contracts";

export interface IUserService
{
    update (data: IUser, role: UserRole): Promise<AxiosResponse<any>>;
    addImage (blob: Blob): Promise<AxiosResponse<any>>;
    getImage (): Promise<AxiosResponse<any>>;
}