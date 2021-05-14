import userEvent from '@testing-library/user-event';
import axios, { AxiosResponse } from 'axios'
import { UserRole } from '../common';

import { IUser } from '../models/contracts';
import { IUserService } from './contracts';

export class UserService implements IUserService
{    
    async update (data: IUser): Promise<AxiosResponse<any>>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/User/Update`,
        {
            Username: data.username,
            Email: data.email,
            Password: data.password,
            Logo: data.logo
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        
        if (response.status !== 200)
            throw new Error(response.statusText);   

        return response
    }
}