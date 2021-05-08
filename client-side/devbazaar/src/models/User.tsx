import { makeAutoObservable } from "mobx";

import { Business } from "../models";

import { IRole } from "../common/IRole";
import { IUser } from "./contracts";

import { IUserService } from "../services/contracts/IUserService";

import { UserStore } from "../stores/UserStore";

export class User implements IUser
{
    userStore: UserStore;
    userService: IUserService;

    roleData: Map<string, IRole> = new Map<string, IRole>();

    id?: string;
    username?: string;
    email?: string;
    logo?: string;
    role: string = 'Client';

    constructor (userStore: UserStore, userService: IUserService)
    {   
        this.userStore = userStore;
        this.userService = userService;

        makeAutoObservable(this, { userStore: false, userService: false });
    }
    /**
     * Updates current user data to the database.
     */
    async update (data: IUser): Promise<void>
    {
        this.userService.updateAsync(data);

        this.username = data.username ?? this.username;
        this.email = data.email ?? this.email;
        this.logo = data.logo ?? this.logo;
        this.role = data.role ?? this.role;
    }

    /**
     *  Gets the users current field values.
     */
    get asJson (): Object
    {
        return {
            Id: this.id,
            Username: this.username,
            Email: this.email
        }
    }

    /**
     * Fetches business or client data from the server. (Depends on a role of the user).
     * And saves it as a new key value pair in the RoleData map.
     * Throws Error if RoleData already has defined key value pair.
     */
    public async fetchRoleData (): Promise<void>
    {
        if (this.roleData.has(this.role)) 
            throw new Error("RoleActions for this Role already exist.");

        switch (this.role) 
        {
            case 'Business':
                let business: Business = new Business(); //this.RootStore
                business.data = await this.userService.fetchRoleData();

                this.roleData.set(this.role, business);
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