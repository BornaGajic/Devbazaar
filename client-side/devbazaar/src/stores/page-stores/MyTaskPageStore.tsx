import { IReactionDisposer, makeAutoObservable, reaction, runInAction, toJS } from "mobx";

import { IServices } from "../../services/contracts";

import { Task } from "../../models";
import RootStore from "../RootStore";

export class MyTaskPageStore
{
    service: IServices;
    reactionHandler: IReactionDisposer;

    isLoading: boolean = true;

    tasks_: Map<number, Task[]> = new Map<number, Task[]>();

    constructor (public rootStore: RootStore, service: IServices)
    {        
        makeAutoObservable(this, { service: false, rootStore: false });

        this.service = service;

        this.reactionHandler = reaction(
            () => this.rootStore.userStore.clientStore.clienTaskStore.tasks,
            value => {
                this.loadMyTasks();
            }
        );
    }

    async loadMyTasks (): Promise<void>
    {
        let pageNumber = 1;
        let taskList = this.rootStore.userStore.clientStore.clienTaskStore.tasks;
        
        runInAction(() => {
            let ipp = this.rootStore.UiState.itemsPerPage;
            
            for (let i = 0; i <= taskList.length; i += ipp, pageNumber++)
            {
                this.tasks_.set(pageNumber, taskList.slice(i, i + ipp));
            }

            this.isLoading = false
        });
    }

    dispose ()
    {
        this.reactionHandler();
    }
}