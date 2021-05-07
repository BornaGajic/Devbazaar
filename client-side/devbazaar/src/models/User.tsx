import { makeAutoObservable } from "mobx";

import { RootStore } from "../stores";

import { UserServiceInstance } from "../services";

import { Business } from "../models";

import { IRole } from "../common/IRole";
import { IUser } from "./contracts";
import { makePersistable } from "mobx-persist-store";

export class User implements IUser
{
    //RootStore?: RootStore;
    
    RoleData: Map<string, IRole> = new Map<string, IRole>();

    Id?: string;
    Username?: string;
    Email?: string;
    Logo?: string;
    Role: string = 'Client';

    constructor (RootStore?: RootStore)
    {   
        makeAutoObservable(this);
        //this.RootStore = RootStore;
    }
    /**
     * Updates current user data to the database.
     */
    async update (data: IUser): Promise<void>
    {
        //UserServiceInstance.updateAsync(data);

        this.Username = data.Username ?? this.Username;
        this.Email = data.Email ?? this.Email;
        this.Logo = data.Logo ?? this.Logo;
        this.Role = data.Role ?? this.Role;
    }

    /**
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

    /**
     * Fetches business or client data from the server. (Depends on a role of the user).
     * And saves it as a new key value pair in the RoleData map.
     * Throws Error if RoleData already has defined key value pair.
     */
    public async fetchRoleData (): Promise<void>
    {
        if (this.RoleData.has(this.Role)) 
            throw new Error("RoleActions for this Role already exist.");

        switch (this.Role) 
        {
            case 'Business':
                let business: Business = new Business(); //this.RootStore
                business.data = await UserServiceInstance.fetchRoleData();

                this.RoleData.set(this.Role, business);
                break;
        
            default:
                break;
        }
    }

    static get className ()
    {
        return 'User';
    }
}