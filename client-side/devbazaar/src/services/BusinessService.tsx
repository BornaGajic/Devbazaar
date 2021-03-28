import axios from 'axios'
import { IBusinessPage } from '../common';
import { IBusiness } from '../stores/contracts/IBusiness';

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
}

export const BusinessServiceInstance = new BusinessService();