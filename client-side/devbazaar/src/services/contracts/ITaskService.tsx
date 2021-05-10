import { AxiosResponse } from "axios";

import { ITaskPage } from "../../common";
import { ITask } from "../../models/contracts";
import { TaskCrud } from "../../models/crud";

export interface ITaskService
{
    fetchPage (pageData: ITaskPage): Promise<AxiosResponse<ITask[]>>;
    createTask (newTask: TaskCrud): Promise<AxiosResponse<ITask>>;
    updateTask (newTask: TaskCrud): Promise<void>;
    deleteTask (taskId: string): Promise<void>;
}