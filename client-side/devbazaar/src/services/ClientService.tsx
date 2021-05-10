import axios, { AxiosResponse } from "axios";

import { IBusiness, IClient } from "../models/contracts";
import { IClientService } from "./contracts";

export class ClientService implements IClientService
{
    /**
     * @deprecated Dodati na backand šta treba da ovo ima smisla
     */    
    async update (data: IClient): Promise<AxiosResponse<any>>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Client/Update`,
        {
            // dodati data
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        
        if (response.status === 400)
        {
            throw new Error(response.statusText);   
        }

        return response
    }

    async addToFavourites (businessCardId: string): Promise<AxiosResponse<IBusiness>>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/Client/AddFavourites`, {
            params: {
                businessId: businessCardId
            }
        });

        if (response.status !== 200)
        {
            throw new Error(response.statusText);
        }

        return response;
    }
}