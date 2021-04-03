import { makeAutoObservable } from "mobx";
import RootStore from "./RootStore";

export class TaskStore
{
    private RootStore: RootStore;
    taskList: Task[] = [];

    constructor (rootStore: RootStore)
    {
        makeAutoObservable(this);
        this.RootStore = rootStore;
    }

    async fetchTasks (): Promise<void>
    {

    }
}

export class Task
{
    constructor ()
    {
        makeAutoObservable(this);
    }
}