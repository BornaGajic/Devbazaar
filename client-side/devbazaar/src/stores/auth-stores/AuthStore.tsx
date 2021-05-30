import { runInAction } from 'mobx';
import { RootStore } from '..';
import { IBusinessPage } from '../../common';

import { IUser } from '../../models/contracts';
import { IAuthService } from '../../services/contracts';

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
     * Logs in the user if the credentials are ok, else an error is thrown.
     * Updates users fields and initializes its role data.
     */
    async loginAsync (username: string, password: string): Promise<void>
    {
        try
        {
            this.token = await this.authService.loginAsync(username, password);
        }
        catch (error)
        {
            console.log(error);return // wrong credentials
        }

        localStorage.setItem('token', this.token);

        this.rootStore.businessPageStore.loadNextBatch();
        this.rootStore.taskPageStore.loadNextBatch();

        runInAction(() => this.rootStore.UiState.isLoggedIn = true);

        await this.rootStore.userStore.fetchUserData(this.token);        
    }

    /**
     * Registers the user and updates its fields, if the provided credentials are unique, else error is thrown.
     * Updates users fields and initializes its role data.
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

    /**
     * Clears the storage of the token and reloads the application.
     */
    logoutAsync (): Promise<void>
    {
        return new Promise (() => {
            localStorage.removeItem('token');
            this.rootStore.UiState.isLoggedIn = false;

            window.location.reload();
        })
    }
}