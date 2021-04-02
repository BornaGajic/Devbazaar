import { makeAutoObservable} from 'mobx';
import jwtDecode from 'jwt-decode';

import RootStore from './RootStore';
import { IUser } from './contracts';
import { IBusiness } from './contracts/IBusiness';

import { UserServiceInstance } from '../services';
import { Business } from './BusinessStore';
import { IRole } from '../common/IRole';


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

    /**
     * Logs in the user and updates its fields
     */
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

        this.User.Id = payload['NameIdentifier']
        this.User.update({
            Username: payload['Username'],
            Email: payload['Email'],
            Role: payload['Role'],
            Logo: payload['Logo']
        } as IUser);

        this.User.fetchRoleData();
    }

    /**
     * Registers the user and updates its fields, then pushes the field values to the database.
     */
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

        this.User.Id = payload['NameIdentifier']
        this.User.update({
            Username: payload['Username'],
            Email: payload['Email'],
            Role: payload['Role'],
            Logo: payload['Logo']
        } as IUser);

        // fetch role data?
    }
}

export class User implements IUser
{
    RoleActions: Map<string, IRole> = new Map<string, IRole>();

    Id?: string;
    Username?: string;
    Email?: string;
    Logo?: string;
    Role: string = 'Client';

    constructor () 
    {
        makeAutoObservable(this);
    }

    /*
     *  Updates current user data to the database.
     */
    async update (data: IUser): Promise<void>
    {
        UserServiceInstance.updateAsync(data);

        this.Username = data.Username ?? this.Username;
        this.Email = data.Email ?? this.Email;
        this.Logo = data.Logo ?? this.Logo;
        this.Role = data.Role ?? this.Role;
    }

    /*
     *  Gets the users current field values.
     */
    get asJson (): Object
    {
        return {
            Id: this.Id,
            Username: this.Username,
            Email: this.Email
        }
    }

    /*
     * Fetches business or client data from the server. (Depends on a role of the user)
     */
     public async fetchRoleData (): Promise<void>
     {
        if (this.RoleActions.has(this.Role)) 
            throw new Error("RoleActions for this Role already exist.");

        switch (this.Role) 
        {
            case 'Business':
                let business: Business = new Business();
                business.data = await UserServiceInstance.fetchRoleData();
    
                this.RoleActions.set(this.Role, business);   
                break;
        
            default:
                break;
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