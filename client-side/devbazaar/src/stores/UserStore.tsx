import { makeAutoObservable} from 'mobx';
import jwtDecode from 'jwt-decode';

import RootStore from './RootStore';
import { IUser } from './contracts';
import { IBusiness } from './contracts/IBusiness';

import { UserServiceInstance } from '../services';
import { Business } from './BusinessStore';


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

        console.log(token);

        let payload: jwtPayload = jwtDecode(token);
        localStorage.setItem('token', token);

        this.User.update({
            Username: payload['Username'],
            Email: payload['Email'],
            Role: payload['Role'],
            Logo: payload['Logo'],
            Id: payload['NameIdentifier']
        });
    }

    async registerAsync (data: IUser): Promise<void>
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

        this.User.update({
            Username: payload['Username'],
            Email: payload['Email'],
            Role: payload['Role'],
            Logo: payload['Logo'],
            Id: payload['NameIdentifier']
        });
    }
}

export class User implements IUser
{
    RoleData?: IBusiness;

    Id?: string;
    Username?: string;
    Email?: string;
    Logo?: string;
    Role?: string;

    constructor () 
    {
        makeAutoObservable(this);
    }

    update (data: any): void
    {
        this.Username = data.Username ?? this.Username;
        this.Email = data.Email ?? this.Email;
        this.Id = data.NameIdentifier ?? this.Id;
        this.Logo = data.Logo ?? this.Logo;
        this.Role = data.Role ?? this.Role;
    }

    /**
     * Fetches business or client data from the server. (Depends on a role of the user)
     */
    async fetchRoleData (): Promise<void>
    {
        if (this.Role == 'Business')
            this.RoleData = await UserServiceInstance.fetchRoleData();
        else 
            return undefined; // Client
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
    NameIdentifier: string;
    Username: string;
    Email: string;
    Role: string;
    Logo: string;
}