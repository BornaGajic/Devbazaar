import { makeAutoObservable } from "mobx";

import { IUser } from "./contracts";

import { IUserService } from "../services/contracts/IUserService";

import { UserStore } from "../stores/UserStore";

export class User implements IUser
{
    userService: IUserService;

    id?: string;
    username?: string;
    email?: string;
    logo?: string;
    role: string = 'Client';

    constructor (userStore?: UserStore, userService?: IUserService)
    {   
        this.userService = userService as IUserService;

        makeAutoObservable(this, { userService: false });
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
}