import { makeAutoObservable } from "mobx";

import { ITask } from "../models/contracts";
import { ITaskService } from "../services/contracts";
import RootStore from "./RootStore";

export class TaskStore
{
    rootStore: RootStore;
    taskService: ITaskService;

    tasks: ITask[] = [];

    constructor (rootStore: RootStore, taskService: ITaskService)
    {
        makeAutoObservable(this, { rootStore: false, taskService: false });

        this.rootStore = rootStore;
        this.taskService = taskService;
    }

    async fetchTasksPage (): Promise<void>
    {
        
    }
}