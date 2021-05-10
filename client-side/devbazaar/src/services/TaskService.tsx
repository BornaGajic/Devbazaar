import axios, { AxiosResponse } from 'axios'

import { ITaskPage } from '../common/ITaskPage';
import { ITask } from '../models/contracts';
import { TaskCrud } from '../models/crud';
import { ITaskService } from './contracts';

export class TaskService implements ITaskService
{
    async fetchPage (pageData: ITaskPage): Promise<AxiosResponse<ITask[]>>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/Task/Tasks`,
        {
           pageData: pageData
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        if (response.status !== 200)
            throw new Error(response.statusText);

        return response;
    }

    async createTask (newTask: TaskCrud): Promise<AxiosResponse<ITask>>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/Task/Create`,
        {
           description: newTask.description,
           lowPrice: newTask.lowPrice,
           highPrice: newTask.highPrice
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        if (response.status !== 200)
            throw new Error(response.statusText);

        return response;
    }

    async updateTask (newTask: TaskCrud): Promise<void>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Task/Update`,
        {
           description: newTask.description,
           lowPrice: newTask.lowPrice,
           highPrice: newTask.highPrice
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        if (response.status !== 200)
            throw new Error(response.statusText);
    }

    async deleteTask (taskId: string): Promise<void>
    {
        let response = await axios.delete(`${axios.defaults.baseURL}/Task/Update`,
        {
           data: {
               id: taskId
           },
           headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
           }
        });

        if (response.status !== 200)
            throw new Error(response.statusText);
    }
}