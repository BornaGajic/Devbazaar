import { makeAutoObservable } from "mobx";

import { IRole } from "../common";
import { IBusinessCardService } from "../services/contracts";
import { IBusiness } from "./contracts";

export class Business implements IBusiness, IRole
{
    businessCardService: IBusinessCardService;

    description?: string;
    about?: string;
    website?: string;
    country?: string;
    city?: string;
    postalCode?: number;
    available?: boolean;
    popularity?: number;
    categories?: [];

    constructor (businessCardService: IBusinessCardService)
    {
        makeAutoObservable(this, { businessCardService: false });

        this.businessCardService = businessCardService;
    }

    /**
     * Updates Business card 
     */
    async update (data: IBusiness): Promise<void>
    {
        this.businessCardService.updateAsync(data);

        this.data = data;
    }

    async pinTask (taskId: string): Promise<void>
    {
        this.businessCardService.pinTask(taskId);
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