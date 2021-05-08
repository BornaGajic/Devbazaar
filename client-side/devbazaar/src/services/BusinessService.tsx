import axios from 'axios'

import { IBusinessPage } from '../common';
import { IBusiness } from '../models/contracts';
import { IBusinessCardService } from './contracts/IBusinessCardService';

export class BusinessCardService implements IBusinessCardService
{
    constructor ()
    {
    }

    async fetchPage (pageData: IBusinessPage): Promise<IBusiness[]>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/Business/Businesses`,
        {
           pageData: pageData
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});

        return response.data;
    }

    async updateAsync (data: IBusiness): Promise<void>
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
        
        if (response.status == 400)
        {
            throw new Error(response.statusText);   
        }
    }
}