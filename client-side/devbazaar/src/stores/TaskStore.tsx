import { makeAutoObservable } from "mobx";

import { IServices } from "../services/contracts";

import { ITask } from "../models/contracts";

export class TaskStore
{
    service: IServices;

    tasks: ITask[] = [];

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
    }

    async fetchTasksPage (): Promise<void>
    {
        
    }
}