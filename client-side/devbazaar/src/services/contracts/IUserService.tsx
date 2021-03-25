import { IEditUser } from "../../stores/rest";

export interface IUserService
{
    LoginAsync (email: string, password: string): Promise<string>;
    RegisterAsync (data: IEditUser): Promise<string>;
    UpdateAsync (data: IEditUser): Promise<void>;
}