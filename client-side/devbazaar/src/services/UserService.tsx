import userEvent from '@testing-library/user-event';
import axios, { AxiosResponse } from 'axios'
import { UserRole } from '../common';

import { IUser } from '../models/contracts';
import { IUserService } from './contracts';

export class UserService implements IUserService
{    
    async update (data: IUser, role: UserRole): Promise<AxiosResponse<any>>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/User/Update`,
        {
            Username: data.username,
            Email: data.email,
            Password: data.password,
            Image: data.imageUrl
        }, 
        { 
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            },
            params: {
                tou: role.toString()
            }
        });
        
        if (response.status !== 200)
            throw new Error(response.statusText);   

        return response
    }

    async addImage (blob: Blob)
    {
        let formData = new FormData();
        formData.append('mImage', blob);

        let response = await axios.post(`${axios.defaults.baseURL}/User/AddImage`, formData,
        { 
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        });
        
        if (response.status !== 200)
            throw new Error(response.statusText);   

        return response
    }

    async getImage ()
    {
        let response = await axios.get<any>(`${axios.defaults.baseURL}/User/GetImage`,
        { 
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        });
        
        if (response.status !== 200)
            throw new Error(response.statusText);   

        return response
    }
}