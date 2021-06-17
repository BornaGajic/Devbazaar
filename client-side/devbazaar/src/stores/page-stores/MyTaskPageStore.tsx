import { makeAutoObservable, runInAction, toJS } from "mobx";

import { IServices } from "../../services/contracts";

import { Task } from "../../models";
import RootStore from "../RootStore";

export class MyTaskPageStore
{
    service: IServices;

    tasks_: Map<number, Task[]> = new Map<number, Task[]>();

    constructor (public rootStore: RootStore, service: IServices)
    {
        makeAutoObservable(this, { service: false, rootStore: false });

        this.service = service;

        if (rootStore.UiState.isLoggedIn)
        {
            this.fetchMyTasks();
        }
    }

    async fetchMyTasks (): Promise<void>
    {
        let pageNumber = 1;
        let response = await this.service.clientService.fetchTasks();

        runInAction(() => {
            response.data.forEach(item => {
                if (this.tasks_.has(pageNumber) === false)
                {
                    this.tasks_.set(pageNumber, []);
                }

                let nTask = new Task();
                nTask.id = item.id;
                nTask.data = item;

                this.tasks_.get(pageNumber)!.push(nTask);

                if (this.rootStore.UiState.itemsPerPage + 1 % pageNumber === 0)
                {
                    pageNumber = 1;
                }
            });
        });
    }
}