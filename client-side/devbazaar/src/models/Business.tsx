import { makeAutoObservable, runInAction } from "mobx";

import { IRole } from "../common";
import { IServices } from "../services/contracts";
import { BusinessStore } from "../stores/user-stores/business-stores/BusinessStore";
import { Category } from "./Category";
import { IBusiness, ICategory } from "./contracts";

export class Business implements IBusiness, IRole
{
    businessStore?: BusinessStore;

    service: IServices;

    id?: string;

    username?: string;
    email?: string;

    description: string = '';
    about?: string;
    website?: string;
    country: string = '';
    city: string = '';
    
    postalCode: number = 0;
    popularity?: number;

    available: boolean = true;

    categories: Category[] = [];

    constructor (service: IServices, businessStore?: BusinessStore)
    {
        makeAutoObservable(this, { service: false, businessStore: false });

        this.businessStore = businessStore;

        this.service = service;
    }

    /**
     * Should be used ONLY once, and that is after the register method is resolved!
     * 
     * --------------------------------Explanation------------------------------------
     * On the backend side, while the user is creating the user, code checks if the passed TypeOfuser (UserRole) is a Client - 
     * if not, it only creates the base user, and if yes it creates the base user and the Client.
     * CreateBusiness is here to provide required step after user creation (if TypeOfUser is a Business).
     */
    async createBusinessCard (creationData: IBusiness): Promise<void>
    {
        this.service.businessCardService.createBusinessCard(creationData);
        let categoryStore = this.businessStore?.userStore.rootStore.categoryStore;

        runInAction(() => {
            this.data = creationData;

            creationData.categories?.forEach(category => {
                let existingCategory = categoryStore?.categories.find(item => item.id === category.id) as Category;

                this.categories.push(existingCategory);
            });
        });
    }

    /**
     * Updates Business card 
     */
    async update (data: IBusiness): Promise<void>
    {
        this.service.businessCardService.update(data);

        runInAction(() => {
            this.data = data;
        }); 
    }

    async addCategory (categoryId: string)
    {
        this.service.businessCardService.addCategory(categoryId);

        let categoryStore = this.businessStore?.userStore.rootStore.categoryStore;

        runInAction(() => {
            let existingCategory = categoryStore?.categories.find(item => item.id === categoryId) as Category;

            this.categories.push(existingCategory);
        }); 
    }

    async removeCategory (categoryId: string)
    {
        this.service.businessCardService.removeCategory(categoryId);

        let categoryStore = this.businessStore?.userStore.rootStore.categoryStore;

        runInAction(() => {
            let idx = categoryStore?.categories.findIndex(item => item.id === categoryId) as number;

            this.categories.splice(idx, 1);
        }); 
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
            Popularity: this.popularity
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
        this.popularity = data.popularity ?? this.popularity;
        this.username = data.username ?? this.username;
        this.email = data.email ?? this.email;
    }
}