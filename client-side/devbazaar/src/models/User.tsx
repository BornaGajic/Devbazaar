import { makeAutoObservable, runInAction } from "mobx";

import { IUser } from "./contracts";
import { IServices } from "../services/contracts";

import { UserRole } from '../common';
import jwtDecode from "jwt-decode";

export class User implements IUser
{
    services: IServices;

    id?: string;
    username?: string;
    email?: string;
    imageUrl?: string;
    
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
        const response = await this.services.userService.update(data, this.role);

        interface jwtPayload
        {
            Username: string;
            Email: string;
        }

		let payload: jwtPayload = jwtDecode(response.data);

        runInAction(() => {
            this.username = payload['Username'];
            this.email = payload['Email'];
        });
        
        runInAction(() => this.data = data);

        localStorage.setItem('token', response.data);
    }

    async addImage (blob: Blob): Promise<void>
    {
        await this.services.userService.addImage(blob);

        runInAction(() => {
            this.imageUrl = URL.createObjectURL(blob);       
        });
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
        this.imageUrl = data.imageUrl ?? this.imageUrl;
        this.role = data.role ?? this.role;
    }
}