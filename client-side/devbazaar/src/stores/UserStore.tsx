import { action, computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import { ChangeEvent } from 'react';
import jwtDecode from 'jwt-decode';


import RootStore from './RootStore';
import { IUser } from './contracts';
import { UserServiceInstance } from '../services';
import { exception } from 'node:console';
import { IEditUser } from './rest/index';

export class UserStore
{
    private RootStore: RootStore;
    User: User;

    constructor (rootStore: RootStore)
    {
        makeAutoObservable(this);

        this.RootStore = rootStore;
        this.User = new User();
    }

    async loginAsync (username: string, password: string): Promise<void>
    {
        let token: string;
        try
        {
            token = await UserServiceInstance.loginAsync(username, password);
        }
        catch (error)
        {
            console.log(error);return
        }

        let payload: jwtPayload = jwtDecode(token);
        localStorage.setItem('token', token);

        this.User.updateFromJson(payload);
    }

    async registerAsync (data: IEditUser): Promise<void>
    {
        let token: string;
        try
        {
            token = await UserServiceInstance.registerAsync(data);
        }
        catch (error)
        {
            console.log(error);return
        }

        let payload: jwtPayload = jwtDecode(token);
        localStorage.setItem('token', token);

        this.User.updateFromJson(payload);
    }

    async updateAsync (data: IEditUser): Promise<void>
    {
        try
        {
            await UserServiceInstance.updateAsync(data);
        }
        catch (error)
        {
            console.log(error);return
        }

        this.User.updateFromJson(data);
    }
}

export class User implements IUser
{
    Id?: string;
    Username: string = '';
    Email: string = '';
    Logo?: string;
    Role?: string;

    constructor () 
    {
        makeAutoObservable(this);
    }

    updateFromJson (json: any): void
    {
        this.Username = json.Username ?? this.Username;
        this.Email = json.Email ?? this.Email;
        this.Id = json.NameIdentifier ?? this.Id;
        this.Logo = json.Logo ?? this.Logo;
        this.Role = json.Role ?? this.Role;
    }

    asJson ()
    {
        return {
            Id: this.Id,
            Username: this.Username,
            Email: this.Email
        }
    }
}

interface jwtPayload
{
    jti: string;
    Username: string;
    Email: string;
    Role: string;
    Logo: string;
}