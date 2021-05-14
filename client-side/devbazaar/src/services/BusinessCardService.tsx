import axios, { AxiosResponse } from 'axios'

import { IBusinessPage } from '../common';
import { ITaskPage } from '../common/ITaskPage';
import { IBusiness, ICategory } from '../models/contracts';
import { ITask } from '../models/contracts/ITask';
import { IBusinessCardService } from './contracts';

export class BusinessCardService implements IBusinessCardService
{
    /**
     * Should be used ONLY once, and that is after the register method is resolved!
     */
    async createBusinessCard (creationData: IBusiness): Promise<AxiosResponse<IBusiness>>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/Business/Create`,
        {
            About: creationData.about,
            Available: creationData.available,
            Categories: creationData.categories,
            City: creationData.city,
            Country: creationData.country,
            PostalCode: creationData.postalCode,
            Website: creationData.website,
            Description: creationData.description
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        return response;
    }

    async fetchPage (pageData: IBusinessPage): Promise<AxiosResponse<IBusiness[]>>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/Business/Businesses`,
        {
           PageNumber: pageData.PageNumber
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        return response;
    }

    /**
     * Fetches pinned tasks from the DB. If pageData is null it returns all pinned tasks.
     * @param pageData page number, filets, etc.
     */
    async fetchPinnedTasks (pageData?: ITaskPage): Promise<AxiosResponse<ITask[]>>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/Business/Tasks`, pageData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        return response;
    }

    async update (data: IBusiness): Promise<void>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Business/Update`,
        {
            About: data.about,
            Available: data.available,
            Categories: data.categories,
            City: data.city,
            Country: data.country,
            PostalCode: data.postalCode,
            Website: data.website,
            Description: data.description
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        
        if (response.status !== 200)
            throw new Error(response.statusText); 
    }

    async addCategory (categoryId: string)
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Business/AddCategory`, {
            params: {
                categoryId: categoryId
            }
        });

        if (response.status !== 200)
            throw new Error(response.statusText);

        return response;
    }

    async removeCategory (categoryId: string)
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Business/AddCategory`, {
            params: {
                categoryId: categoryId
            }
        });

        if (response.status !== 200)
            throw new Error(response.statusText);

        return response;
    }
    /**
     * Pins a task to the pinned tasks tab.
     */
    async pinTask (taskId: string): Promise<AxiosResponse<ITask>>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Business/Acquire`, {
            params: {
                clientTaskid: taskId
            }
        });

        if (response.status !== 200)
            throw new Error(response.statusText);

        return response;
    }

    async removePinnedTask (taskId: string): Promise<AxiosResponse>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Business/RemovePinnedTask`, {
            params: {
                clientTaskid: taskId
            }
        });

        if (response.status !== 200)
            throw new Error(response.statusText);

        return response;
    }

    async fetchBusinessCardData (): Promise<AxiosResponse<IBusiness>>
    {
        let response = await axios.get(`${axios.defaults.baseURL}/Business/Data`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        if (response.status !== 200)
            throw new Error(response.statusText);
        
        return response;
    }

    async fetchCategories (): Promise<AxiosResponse<ICategory[]>>
    {
        let response = await axios.get(`${axios.defaults.baseURL}/Business/Categories`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        if (response.status !== 200)
            throw new Error(response.statusText);
        
        return response;
    }
}