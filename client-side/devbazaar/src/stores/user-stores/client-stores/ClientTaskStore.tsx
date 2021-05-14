/**
 * --------------------
 * Client's tasks store
 * --------------------
 */

import { makeAutoObservable, runInAction } from "mobx";

import { ClientStore } from "./ClientStore";

import { Task } from "../../../models";

import { ITask } from "../../../models/contracts";
import { IServices } from "../../../services/contracts";

export class ClientTaskStore
{
    clientStore: ClientStore;
    service: IServices;

    tasks: Task[] = [];

    constructor (clientStore: ClientStore, service: IServices)
    {
        makeAutoObservable(this, { service: false })

        this.clientStore = clientStore;
        this.service = service;
    }

    async loadTasks (): Promise<void>
    {
        let response = await this.service.clientService.fetchTasks();

        await this.updateFromJson(response.data);
    }

    async updateFromJson (data: ITask[]): Promise<void>
    {
        data.forEach(task => {
            let nTask = new Task();
            runInAction(() => {
                nTask.id = task.id;
                nTask.data = task;

                this.tasks.push(nTask)
            });
        });
    }

    async updateTask (newTask: ITask): Promise<void>
    {
        runInAction(() =>
            this.tasks.forEach( task => {
                if(task.id === newTask.id)
                {
                    task.data = newTask;
                    return;
                }
            })
        );

        this.service.taskService.updateTask(newTask);
    }

    async createTask (newTask: ITask): Promise<void>
    {
        let response = await this.service.taskService.createTask(newTask);

        let nTask = new Task();
        
        runInAction(() => {
            nTask.id = response.data.id;
            nTask.data = response.data;
            this.tasks.push(nTask);
        });
    }

    async removeTask (taskId: string): Promise<void>
    {
        let idx = this.tasks.findIndex(task => task.id === taskId);

        runInAction(() => this.tasks.splice(idx, 1));

        this.service.taskService.deleteTask(taskId);
    }
}