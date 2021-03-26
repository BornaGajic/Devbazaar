import { makeAutoObservable} from 'mobx';
import jwtDecode from 'jwt-decode';


import RootStore from './RootStore';
import { IUser, IUserData } from './contracts';

import { UserServiceInstance } from '../services';

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
        let loginDto: any;
        try
        {
            loginDto = await UserServiceInstance.loginAsync(username, password);
        }
        catch (error)
        {
            console.log(error);return
        }

        console.log(loginDto);

        let payload: jwtPayload = jwtDecode(loginDto.Token);
        localStorage.setItem('token', loginDto.Token);

        this.User.updateFromJson(payload);
    }

    async registerAsync (data: IUserData): Promise<void>
    {
        let loginDto: any;
        try
        {
            loginDto = await UserServiceInstance.registerAsync(data);
        }
        catch (error)
        {
            console.log(error);return
        }

        let payload: jwtPayload = jwtDecode(loginDto.Token);
        localStorage.setItem('token', loginDto.Token);

        this.User.updateFromJson(payload);
    }

    async updateAsync (data: IUserData): Promise<void>
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
    Username?: string;
    Email?: string;
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

    get asJson ()
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