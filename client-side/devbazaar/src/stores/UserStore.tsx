import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { ChangeEvent } from 'react';
import jwtDecode from 'jwt-decode';


import RootStore from './RootStore';
import { IUserStore } from './contracts';
import { UserServiceInstance } from '../services';

export class UserStore implements IUserStore
{
    private RootStore: RootStore;

    Id?: string;
    Username?: string;
    Email?: string;
    Password?: string;
    Logo?: string;

    constructor (rootStore: RootStore)
    {
        makeAutoObservable(this);

        this.RootStore = rootStore;
    }

    async Login (username: string, password: string)
    {
        let token = await UserServiceInstance.LoginAsync(username, password);

        let payload = jwtDecode(token);

        console.log(payload);
    }
}