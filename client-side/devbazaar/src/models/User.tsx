import { makeAutoObservable, runInAction } from "mobx";

import { IUser } from "./contracts";
import { IServices } from "../services/contracts";

import { UserRole } from '../common';

export class User implements IUser
{
    services: IServices;

    id?: string;
    username?: string;
    email?: string;
    logo?: string;
    role: UserRole = UserRole.CLIENT;

    constructor (services: IServices)
    {   
        makeAutoObservable(this, { services: false });

        this.services = services;
    }
    /**
     * Updates current user data to the database.
     */
    async update (data: IUser): Promise<void>
    {
        this.services.userService.update(data);
        
        runInAction(() => this.data = data);
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

    set data (data: IUser)
    {
        this.username = data.username ?? this.username;
        this.email = data.email ?? this.email;
        this.logo = data.logo ?? this.logo;
        this.role = data.role ?? this.role;
    }
}