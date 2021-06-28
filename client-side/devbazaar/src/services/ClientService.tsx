import axios, { AxiosResponse } from "axios";

import { IBusiness, IClient, ITask } from "../models/contracts";
import { IClientService } from "./contracts";

export class ClientService implements IClientService
{
    async update (data: IClient): Promise<AxiosResponse>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Client/Update`,
        {
            data: {
                About: data.about,
                Website: data.website,
                Country: data.country,
                City: data.city,
                PostalCode: data.postalCode
            }
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        
        if (response.status !== 200)
            throw new Error(response.statusText);

        return response;
    }

    async addToFavourites (businessCardId: string): Promise<AxiosResponse<IBusiness>>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Client/AddFavourites`, null, 
        {
            params: {
                businessId: businessCardId
            },
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        });

        if (response.status !== 200)
            throw new Error(response.statusText);

        return response;
    }

    async removeFromFavourites (businessCardId: string): Promise<AxiosResponse>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Client/RemoveFavourite`, null, 
        {
            params: {
                businessId: businessCardId
            },
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        });

        if (response.status !== 200)
            throw new Error(response.statusText);
        
        return response;
    }

    async fetchTasks (): Promise<AxiosResponse<ITask[]>>
    {
        let response = await axios.get(`${axios.defaults.baseURL}/Client/Tasks`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        if (response.status !== 200)
            throw new Error(response.statusText);
        
        return response;
    }

    async fetchFavouriteBusinesses (): Promise<AxiosResponse<IBusiness[]>>
    {
        let response = await axios.get(`${axios.defaults.baseURL}/Client/Favourites`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        if (response.status !== 200)
            throw new Error(response.statusText);
        
        return response;
    }

    async fetchClientData (): Promise<AxiosResponse<IClient>>
    {
        let response = await axios.get(`${axios.defaults.baseURL}/Client/Data`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        if (response.status !== 200)
            throw new Error(response.statusText);
        
        return response;
    }
}