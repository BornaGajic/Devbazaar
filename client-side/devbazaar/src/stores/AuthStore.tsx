
import { IUser } from '../models/contracts';
import { AuthService } from '../services';

import RootStore from './RootStore';

export class AuthStore
{
    authService: AuthService;
    rootStore: RootStore;

    token: string = '';

    constructor (rootStore: RootStore, authService: AuthService)
    {
        this.authService = authService;
        this.rootStore = rootStore;
    }

    /**
     * Logs in the user and updates its fields
     */
    async loginAsync (username: string, password: string): Promise<void>
    {
        try
        {
            this.token = await this.authService.loginAsync(username, password);
        }
        catch (error)
        {
            console.log(error);return
        }

        localStorage.setItem('token', this.token);

        this.rootStore.userStore.loginAsync(this.token);
    }

    /**
     * Registers the user and updates its fields, then pushes the field values to the database.
     */
    async registerAsync (data: IUser): Promise<void>
    {
        try
        {
            this.token = await this.authService.registerAsync(data);
        }
        catch (error)
        {
            console.log(error);return
        }

        localStorage.setItem('token', this.token);

        this.rootStore.userStore.loginAsync(this.token);
    }

}