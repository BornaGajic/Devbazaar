import axios, { AxiosResponse } from 'axios'

import { Task } from '../models/Task';

import { ITaskPage } from '../common/ITaskPage';
import { ITaskService } from './contracts';
import { TaskCrud } from '../models/crud';

export class TaskService implements ITaskService
{
	async fetchPage (pageData: ITaskPage): Promise<AxiosResponse<Task[]>>
	{
		let response = await axios.post(`${axios.defaults.baseURL}/Task/Tasks`,
		{
			PageNumber: pageData.PageNumber
		}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

		if (response.status !== 200)
			throw new Error(response.statusText);

		return response;
	}

	async createTask (newTask: TaskCrud): Promise<AxiosResponse<Task>>
	{
		let response = await axios.post(`${axios.defaults.baseURL}/Task/Create`,
		{
			Title: newTask.title,
			Description: newTask.description,
			LowPrice: newTask.lowPrice,
			HighPrice: newTask.highPrice
		}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

		if (response.status !== 200)
			throw new Error(response.statusText);

		return response;
	}

	async updateTask (newTask: TaskCrud): Promise<void>
	{
		let response = await axios.put(`${axios.defaults.baseURL}/Task/Update`,
		{
			Description: newTask.description,
			LowPrice: newTask.lowPrice,
			HighPrice: newTask.highPrice
		}, 
		{ 
			headers: { 
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			params: {
				taskId: newTask.id
			}
		});

		if (response.status !== 200)
			throw new Error(response.statusText);
	}

	async deleteTask (taskId: string): Promise<void>
	{
		let response = await axios.delete(`${axios.defaults.baseURL}/Task/Delete`,
		{
		data: {
			Id: taskId
		},
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
		});

		if (response.status !== 200)
			throw new Error(response.statusText);
	}
}