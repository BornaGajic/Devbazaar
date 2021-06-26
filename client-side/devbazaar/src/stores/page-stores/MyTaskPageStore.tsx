import { makeAutoObservable, runInAction, toJS } from "mobx";

import { IServices } from "../../services/contracts";

import { Task } from "../../models";
import RootStore from "../RootStore";

export class MyTaskPageStore
{
    service: IServices;

    isLoading: boolean = true;

    tasks_: Map<number, Task[]> = new Map<number, Task[]>();

    constructor (public rootStore: RootStore, service: IServices)
    {        
        makeAutoObservable(this, { service: false, rootStore: false });

        this.service = service;
    }

    async loadMyTasks (): Promise<void>
    {
        let pageNumber = 1;
        let taskList = this.rootStore.userStore.clientStore.clienTaskStore.tasks;
        
        runInAction(() => {
            let ipp = this.rootStore.UiState.itemsPerPage;
            
            for (let i = 0; i <= taskList.length; i += ipp, pageNumber++)
            {
                this.tasks_.set(pageNumber, taskList.slice(i, ipp));
            }

            this.isLoading = false
        });
    }
}