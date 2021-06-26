import { makeAutoObservable, runInAction } from "mobx";

import { IServices } from "../../services/contracts";

import { ITaskPage } from "../../common";
import { Task } from "../../models";
import RootStore from "../RootStore";

export class TaskPageStore
{
    service: IServices;

    isLoading: boolean = true;

    tasks_: Map<number, Task[]> = new Map<number, Task[]>();

    constructor (public rootStore: RootStore, service: IServices)
    {
        makeAutoObservable(this, { service: false, rootStore: false });

        this.service = service;

        if (rootStore.UiState.isLoggedIn)
        {
            this.loadNextBatch();
        }
    }

    async loadNextBatch (): Promise<void>
    {
        Promise.all([
            await this.fetchTasksPage({ PageNumber: 1 }),
            await this.fetchTasksPage({ PageNumber: 2 }),
        ]).then(() => this.isLoading = false);
    }

    async fetchTasksPage (pageData: ITaskPage): Promise<void>
    {
        let response = await this.service.taskService.fetchPage(pageData);

        runInAction(() => {
            if (this.tasks_.has(pageData.PageNumber) === false)
            {
                this.tasks_.set(pageData.PageNumber, []);
            }

            response.data.forEach(item => {
                let nTask = new Task();
                nTask.id = item.id;
                nTask.data = item;

                this.tasks_.get(pageData.PageNumber)!.push(nTask);
            });
        });
    }
}