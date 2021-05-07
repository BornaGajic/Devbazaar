import axios from 'axios'

import { IBusinessPage } from '../common';
import { IBusiness } from '../models/contracts';

class BusinessService
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
            About: data.About,
            Available: data.Available,
            Categories: data.Categories,
            City: data.City,
            Country: data.Country,
            PostalCode: data.PostalCode,
            Website: data.Website,
            Description: data.Description
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        
        if (response.status == 400)
        {
            throw new Error(response.statusText);   
        }
    }
}

export const BusinessServiceInstance = new BusinessService();