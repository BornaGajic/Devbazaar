import { makeAutoObservable } from "mobx";

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
    async update (data: IBusinessPayload): Promise<void>
    {
        //BusinessService.updateAsync(data);

        this.description = data.Description ?? this.description;
        this.about = data.About ?? this.about;
        this.website = data.Website ?? this.website;
        this.country = data.Country ?? this.country;
        this.city = data.City ?? this.city;
        this.available = data.Available ?? this.available;
        this.categories = data.Categories ?? this.categories;
        this.popularity = data.Popularity ?? this.popularity;
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
    set data (data: IBusinessPayload)
    {
        this.description = data.Description ?? this.description;
        this.about = data.About ?? this.about;
        this.website = data.Website ?? this.website;
        this.country = data.Country ?? this.country;
        this.city = data.City ?? this.city;
        this.available = data.Available ?? this.available;
        this.categories = data.Categories ?? this.categories;
        this.popularity = data.Popularity ?? this.popularity;
    }

    static get className ()
    {
        return 'Business';
    }
}

// this is temporary here
interface IBusinessPayload
{
    Id?: string;
    Description?: string;
    About?: string;
    Website?: string;
    Country?: string;
    City?: string;
    PostalCode?: number;
    Available?: boolean;
    Popularity?: number;

    Categories?: [];
}