import { makeAutoObservable, runInAction } from "mobx";

import { Business } from ".";
import { Task } from ".";

import { IRole } from "../common";
import { IServices } from "../services/contracts";
import { IClient, ITask } from "./contracts";
import { TaskCrud } from "./crud";



export class Client implements IClient, IRole
{
    service: IServices;

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

    async updateFromJson (jsonData: IClient): Promise<void>
    {
        runInAction(() => {
            jsonData.myTasks?.forEach((data) => {                
                let newTask = new Task();
                newTask.id = data.id;
                newTask.data = data;

                this.myTasks.push(newTask);
            });
            jsonData.favBusinesses?.forEach((data) => {
                let newFavBusiness = new Business(this.service);
                newFavBusiness.data = data;

                this.favBusinesses.push(newFavBusiness);
            });
        });
    }

    async updateMyTask (newTask: TaskCrud): Promise<void>
    {
        await this.service.taskService.updateTask(newTask);

        runInAction(() => {
            this.myTasks.forEach( (item, idx) => {
                if(item.id === newTask.id)
                {
                    item.data = newTask as ITask;
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
            Tasks: this.myTasks,
            FavoriteBusinesses: this.favBusinesses
        };
    }

    set data (data: IClient)
    {
        this.myTasks = data.myTasks ?? this.myTasks;
        this.favBusinesses = data.favBusinesses ?? this.favBusinesses;
    }
}