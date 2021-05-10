import axios, { AxiosResponse } from 'axios'

import { IUser } from '../models/contracts';
import { IUserService } from './contracts';

export class UserService implements IUserService
{
    async updateAsync (data: IUser): Promise<AxiosResponse<any>>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/User/Update`,
        {
            Username: data.username,
            Email: data.email,
            Password: data.password,
            Logo: data.logo
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        
        if (response.status === 400)
        {
            throw new Error(response.statusText);   
        }

        return response
    }

    /** 
     * Returnes Promise of own business card data.
    */
    async fetchRoleData (): Promise<AxiosResponse<any>>
    {
        let response = await axios.get(`${axios.defaults.baseURL}/Business/Data`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        
        return response;
    }
}