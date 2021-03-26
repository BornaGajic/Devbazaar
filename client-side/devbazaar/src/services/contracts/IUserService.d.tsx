import { IUserData } from "../../stores/contracts";

export interface IUserService
{
    LoginAsync (email: string, password: string): Promise<string>;
    RegisterAsync (data: IUserData): Promise<string>;
    UpdateAsync (data: IUserData): Promise<void>;
}