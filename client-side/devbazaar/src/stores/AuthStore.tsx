import { RootStore } from '.';

import { IUser } from '../models/contracts';
import { IAuthService } from '../services/contracts';

export class AuthStore
{
    rootStore: RootStore;
    authService: IAuthService;

    token: string = '';

    constructor (rootStore: RootStore, authService: IAuthService)
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

        await this.rootStore.userStore.fetchUserData(this.token);
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

        await this.rootStore.userStore.fetchUserData(this.token);
    }

    logoutAsync (): Promise<void>
    {
        return new Promise (() => {
            localStorage.removeItem('token');

            window.location.reload();
        })
    }

}