import { AxiosResponse } from "axios";

import { ITaskPage } from "../../common";
import { ITask } from "../../models/contracts";
import { TaskCrud } from "../../models/crud";
import { Task } from "../../models/Task";

export interface ITaskService
{
    fetchPage (pageData: ITaskPage): Promise<AxiosResponse<Task[]>>;
    createTask (newTask: TaskCrud): Promise<AxiosResponse<Task>>;
    updateTask (newTask: TaskCrud): Promise<void>;
    deleteTask (taskId: string): Promise<void>;
}