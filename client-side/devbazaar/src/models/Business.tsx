import { makeAutoObservable, runInAction } from "mobx";

import { IRole } from "../common";
import { ITaskPage } from "../common/ITaskPage";
import { IServices } from "../services/contracts";
import { IBusiness } from "./contracts";
import { ICategory } from "./contracts/ICategory";
import { ITask } from "./contracts/ITask";

export class Business implements IBusiness, IRole
{
    service: IServices;

    description?: string;
    about?: string;
    website?: string;
    country?: string;
    city?: string;
    postalCode?: number;
    available?: boolean;
    popularity?: number;
    categories?: ICategory[];

    pinnedTasks?: ITask[];

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
    }

    /**
     * Updates Business card 
     */
    async update (data: IBusiness): Promise<void>
    {
        this.service.businessCardService.update(data);

        runInAction(() => this.data = data); 
    }

    async pinTask (taskId: string): Promise<void>
    {
        let response = await this.service.businessCardService.pinTask(taskId);

        runInAction(() => this.pinnedTasks?.push(response.data));
    }

    async fetchPinnedTasks (): Promise<void>
    {
        let response = await this.service.businessCardService.fetchPinnedTasks({ PageNumber: 1 } as ITaskPage);

        runInAction(() => this.pinnedTasks = response.data); 
    }

    /**
    * Returnes Business as Json object 
    */
    get asJson (): Object
    {
        return {
            Description: this.description,
            About: this.about,
            Website: this.website,
            Country: this.country,
            City: this.city,
            PostalCode: this.postalCode,
            Available: this.available,
            Popularity: this.popularity,
            Categories: this.categories
        }
    }

    /**
     * Setter for Business fields
     */
    set data (data: IBusiness)
    {
        this.description = data.description ?? this.description;
        this.about = data.about ?? this.about;
        this.website = data.website ?? this.website;
        this.country = data.country ?? this.country;
        this.city = data.city ?? this.city;
        this.postalCode = data.postalCode ?? this.postalCode;
        this.available = data.available ?? this.available;
        this.categories = data.categories ?? this.categories;
        this.popularity = data.popularity ?? this.popularity;
    }
}