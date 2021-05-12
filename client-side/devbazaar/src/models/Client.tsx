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

    about?: string;
    website?: string;
    country?: string;
    city?: string;
    
    postalCode?: number;
    
    myTasks: Task[] = [];

    favBusinesses: Business[] = [];

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
    }

    async update (data: IClient): Promise<void>
    {
        this.service.clientService.update(data);

        runInAction(() => this.data = data); 
    }

    async updateMyTask (newTask: TaskCrud): Promise<void>
    {
        await this.service.taskService.updateTask(newTask);

        runInAction(() => {
            this.myTasks.forEach( (item, idx) => {
                if(item.id === newTask.id)
                {
                    item.data = newTask as ITask;
                    return;
                }
            });
        });
    }

    async createMyTask (newTask: TaskCrud): Promise<void>
    {
        let response = await this.service.taskService.createTask(newTask);

        let nTask = new Task();
        nTask.id = response.data.id;
        nTask.data = response.data;

        runInAction(() => this.myTasks?.push(nTask));
    }

    async deleteMyTask (taskId: string): Promise<void>
    {
        await this.service.taskService.deleteTask(taskId);

        runInAction(() => {
            this.myTasks.forEach( (item, idx) => {
                if(item.id === taskId)
                {
                    this.myTasks.splice(idx, 1);
                }
            });
        });
    }

    async addToFavourites (businessCardId: string): Promise<void>
    {
        let response = await this.service.clientService.addToFavourites(businessCardId);

        let nFavBusiness = new Business(this.service);
        nFavBusiness.data = response.data;

        runInAction(() => this.favBusinesses?.push(nFavBusiness));
    }

    get asJson (): Object
    {
        return {
            About: this.about,
            Website: this.website,
            Country: this.country,
            City: this.city,
            Tasks: this.myTasks,
            FavoriteBusinesses: this.favBusinesses
        };
    }

    set data (data: IClient)
    {
        let myTasksFromJson = (myTasksJson: ITask[]) => {
            for (let taskJson of myTasksJson)
            {
                let nTask = new Task();
                nTask.id = taskJson.id;
                nTask.data = taskJson;
    
                runInAction(() => this.myTasks?.push(nTask));
            }
        };

        let myFavBusinessFromJson = (myFavBusinessJson: IBusiness[]) => {
            for (let favBusinessJson of myFavBusinessJson)
            {
                let nFavBusiness = new Business(this.service);
                nFavBusiness.id = favBusinessJson.id;
                nFavBusiness.data = favBusinessJson;
    
                runInAction(() => this.favBusinesses?.push(nFavBusiness));
            }
        };
        
        this.about = data.about ?? this.about;
        this.website = data.website ?? this.website;
        this.country = data.country ?? this.country;
        this.city = data.city ?? this.city;
        this.postalCode = data.postalCode ?? this.postalCode;

        if (data.myTasks) myTasksFromJson(data.myTasks);
        if (data.favBusinesses) myFavBusinessFromJson(data.favBusinesses);
    }
}