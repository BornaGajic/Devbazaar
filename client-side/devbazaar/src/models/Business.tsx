import { makeAutoObservable } from "mobx";

import { RootStore } from "../stores";

import { BusinessServiceInstance } from "../services";

import { IRole } from "../common";
import { IBusiness } from "./contracts";

export class Business implements IBusiness, IRole
{
    //private RootStore: RootStore;

    Description?: string;
    About?: string;
    Website?: string;
    Country?: string;
    City?: string;
    Available?: boolean;
    Popularity?: number;
    Categories?: [];

    constructor () //rootStore: RootStore
    {
        makeAutoObservable(this);

        //this.RootStore = rootStore;
    }

    /**
     * Updates Business card 
     */
    async update (data: IBusiness): Promise<void>
    {
        BusinessServiceInstance.updateAsync(data);

        this.Description = data.Description ?? this.Description;
        this.About = data.About ?? this.About;
        this.Website = data.Website ?? this.Website;
        this.Country = data.Country ?? this.Country;
        this.City = data.City ?? this.City;
        this.Available = data.Available ?? this.Available;
        this.Categories = data.Categories ?? this.Categories;
        this.Popularity = data.Popularity ?? this.Popularity;
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
            Description: this.Description,
            About: this.About,
            Website: this.Website,
            Country: this.Country,
            City: this.City,
            Available: this.Available,
            Popularity: this.Popularity,
            Categories: this.Categories
        }
    }

    /**
     * Setter for Business fields
     */
    set data (data: IBusiness)
    {
        this.Description = data.Description ?? this.Description;
        this.About = data.About ?? this.About;
        this.Website = data.Website ?? this.Website;
        this.Country = data.Country ?? this.Country;
        this.City = data.City ?? this.City;
        this.Available = data.Available ?? this.Available;
        this.Categories = data.Categories ?? this.Categories;
        this.Popularity = data.Popularity ?? this.Popularity;
    }

    static get className ()
    {
        return 'Business';
    }
}