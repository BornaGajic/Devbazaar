import { IUser } from "../../models/contracts";

export interface IAuthService
{
    /**
     * logs the user in the app, throws error if the credentials are wrong.
     * @returns jwt-token
     */
    loginAsync (email: string, password: string): Promise<string>;

    /**
     * registers the user, throws error if a user with the same credentials already exists
     * @param data credentials
     * @returns jwt-token
     */
    registerAsync (data: IUser): Promise<string>;
}