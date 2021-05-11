import { makeAutoObservable, runInAction } from "mobx";

import { IServices } from "../services/contracts";

import { ITask } from "../models/contracts";
import { ITaskPage } from "../common";

export class TaskStore
{
    service: IServices;

    tasks: ITask[] = [];

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
    }

    async fetchTasksPage (pageData: ITaskPage): Promise<void>
    {
        let response = await this.service.taskService.fetchPage(pageData);

        runInAction(() => this.tasks = this.tasks.length === 0 ? response.data : this.tasks.concat(response.data))
    }
}