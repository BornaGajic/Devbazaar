import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import RootStore from "./RootStore";

export class TaskStore
{
    rootStore: RootStore;
    taskList: Task[] = [];

    constructor (rootStore: RootStore)
    {
        this.rootStore = rootStore;

        makeAutoObservable(this, { rootStore: false });
        
        makePersistable(this, 
        {
            name: "TaskStore",
            properties: ["taskList"],
            storage: localStorage,
            stringify: true
        }, {})
    }

    async fetchTasks (): Promise<void>
    {

    }

    async createTask (n: string)
    {
        this.taskList.push(new Task(n));
    }
}

export class Task
{
    itemName: string;
    itemNumber: number;

    constructor (itemName: string)
    {
        this.itemName = itemName;
        this.itemNumber = Math.random() * 100;
    }
}