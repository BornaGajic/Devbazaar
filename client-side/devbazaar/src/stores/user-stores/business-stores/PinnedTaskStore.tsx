import { makeAutoObservable, runInAction } from "mobx";
import { Task } from "../../../models";
import { IServices } from "../../../services/contracts";
import { BusinessStore } from "./BusinessStore";

export class PinnedTaskStore
{
    businessStore: BusinessStore;

    service: IServices;

    pinnedTasks: Task[] = [];

    constructor (businessStore: BusinessStore, service: IServices)
    {
        makeAutoObservable(this, { businessStore: false, service: false });

        this.businessStore = businessStore;
        this.service = service;
    }

    async loadPinnedTasks (): Promise<void>
    {
        let response = await this.service.businessCardService.fetchPinnedTasks();

        response.data.forEach(task => {
            let newPin = new Task();
            newPin.data = task;
            newPin.id = task.id; 

            runInAction(() => this.pinnedTasks.push(newPin));
        });
    }

    async removePinnedTask (taskId: string): Promise<void>
    {
        let idx = this.pinnedTasks.findIndex(task => taskId === task.id);

        runInAction(() => this.pinnedTasks.splice(idx, 1));

        this.service.businessCardService.removePinnedTask(taskId);
    }

    async pinTask (taskId: string): Promise<void>
    {
        let response = await this.service.businessCardService.pinTask(taskId);

        let newPinnedTask = new Task();
        
        runInAction(() => {
            newPinnedTask.data = response.data;
            newPinnedTask.id = taskId;
    
            this.pinnedTasks.push(newPinnedTask);
        });
    }
}