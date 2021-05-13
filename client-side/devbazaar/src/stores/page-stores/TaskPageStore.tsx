import { makeAutoObservable, runInAction } from "mobx";

import { IServices } from "../../services/contracts";

import { ITaskPage } from "../../common";
import { Task } from "../../models";
import RootStore from "../RootStore";

export class TaskPageStore
{
    service: IServices;

    tasks: Task[] = [];

    constructor (public rootStore: RootStore, service: IServices)
    {
        makeAutoObservable(this, { service: false, rootStore: false });

        this.service = service;
    }

    async fetchTasksPage (pageData: ITaskPage): Promise<void>
    {
        let response = await this.service.taskService.fetchPage(pageData);

        runInAction(() => {
            response.data.forEach(item => {
                let nTask = new Task();
                nTask.id = item.id;
                nTask.data = item;
                this.tasks.push(nTask);
            });
        });
    }
}