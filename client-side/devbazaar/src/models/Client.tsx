import { makeAutoObservable, runInAction } from "mobx";

import { Business } from ".";
import { Task } from ".";

import { IRole } from "../common";
import { IServices } from "../services/contracts";
import { IBusiness, IClient, ITask } from "./contracts";
import { TaskCrud } from "./crud";



export class Client implements IClient, IRole
{
    service: IServices;

    id?: string;

    username?: string;
    email?: string;
    about?: string;
    website?: string;
    country?: string;
    city?: string;
    
    postalCode: number = 0;
    
    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
    }

    async update (data: IClient): Promise<void>
    {
        runInAction(() => this.data = data); 

        this.service.clientService.update(data);
    }

    get asJson (): Object
    {
        return {
            About: this.about,
            Website: this.website,
            Country: this.country,
            City: this.city,
            Username: this.username,
            Email: this.email
        };
    }

    set data (data: IClient)
    {
        this.username = data.username ?? this.username;
        this.email = data.email ?? this.email;
        this.about = data.about ?? this.about;
        this.website = data.website ?? this.website;
        this.country = data.country ?? this.country;
        this.city = data.city ?? this.city;
        this.postalCode = data.postalCode ?? this.postalCode;
    }
}