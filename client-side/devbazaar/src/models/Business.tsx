import { makeAutoObservable, runInAction } from "mobx";

import { Category } from ".";
import { Task } from ".";

import { IRole } from "../common";
import { ITaskPage } from "../common";
import { IServices } from "../services/contracts";
import { IBusiness, ITask } from "./contracts";

export class Business implements IBusiness, IRole
{
    service: IServices;

    id?: string;

    description: string = '';
    about?: string;
    website?: string;
    country: string = '';
    city: string = '';
    
    postalCode: number = 0;
    popularity?: number;

    available: boolean = true;

    categories: Category[] = [];

    pinnedTasks?: Task[];

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

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

        runInAction(() => {
            this.data = creationData;
            // this.updateCategories
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
            // this.updateCategories
        }); 
    }

    // Will be implemented when I define how the categories will be updated on the UI 
    async updateCategories (updatedCategories: ITask): Promise<void>
    {
       throw new Error("Not implemeneted!");
    }

    /**
     * Idea: implement drag and drop pinned tasks (reordering and such - e.g. Tachiyomi)
     */
    async updatePinnedTask (updatedTask: ITask): Promise<void>
    {
        this.pinnedTasks?.find(item => {
            if (item.id === updatedTask.id)
            {
                item.data = updatedTask;
            }
        });
    }

    async pinTask (taskId: string): Promise<void>
    {
        let response = await this.service.businessCardService.pinTask(taskId);

        let pinnedTask = new Task();
        pinnedTask.id = taskId;
        pinnedTask.data = response.data;

        runInAction(() => this.pinnedTasks?.push(pinnedTask));
    }

    async fetchPinnedTasks (pageData: ITaskPage): Promise<void>
    {
        let response = await this.service.businessCardService.fetchPinnedTasks(pageData);

        runInAction(() => {
            response.data.forEach((item) => {
                let pTask = new Task();
                pTask.id = item.id;
                pTask.data = item;
    
                this.pinnedTasks?.push(pTask);
            });
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
        this.popularity = data.popularity ?? this.popularity;
    }
}