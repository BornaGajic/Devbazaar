import { makeAutoObservable } from "mobx";

import { RootStore } from "../stores";

import { IRole } from "../common";
import { IBusiness } from "./contracts";

export class Business implements IBusiness, IRole
{
    description?: string;
    about?: string;
    website?: string;
    country?: string;
    city?: string;
    available?: boolean;
    popularity?: number;
    categories?: [];

    constructor ()
    {
        makeAutoObservable(this);
    }

    /**
     * Updates Business card 
     */
    async update (data: IBusiness): Promise<void>
    {
        BusinessService.updateAsync(data);

        this.description = data.description ?? this.description;
        this.about = data.about ?? this.about;
        this.website = data.website ?? this.website;
        this.country = data.country ?? this.country;
        this.city = data.city ?? this.city;
        this.available = data.available ?? this.available;
        this.categories = data.categories ?? this.categories;
        this.popularity = data.popularity ?? this.popularity;
    }

    async pinTask (taskId: string): Promise<void>
    {
        
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
        this.available = data.available ?? this.available;
        this.categories = data.categories ?? this.categories;
        this.popularity = data.popularity ?? this.popularity;
    }

    static get className ()
    {
        return 'Business';
    }
}