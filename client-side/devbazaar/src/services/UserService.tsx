import axios from 'axios'
import { IUser } from '../stores/contracts';
import { IEditUser } from '../stores/rest';

import { IUserService } from './contracts'

class UserService
{
    constructor ()
    {
    }
    
    async loginAsync (email: string, password: string): Promise<string>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/User/Login`,
        {
            Email : email,
            Password : password
        });

        if (response.status == 400 || response.status == 404)
        {
            throw new Error("Not found");
        }

        return response.data;
    }

    async registerAsync (data: IEditUser): Promise<string>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/User/Register`,
        {
            Username : data.Username,
            Email : data.Email,
            Password : data.Password
        }, { params : { TypeOfUser : data.Role } });

        if (response.status == 409)
        {
            throw new Error("User already exists!");
        }

        return response.data;
    }

    async updateAsync (data: IEditUser): Promise<void>
    {
        let response = await axios.put(`${axios.defaults.baseURL}/User/Update`,
        {
            Username: data.Username,
            Email: data.Email,
            Password: data.Password,
            Logo: data.Logo
        }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
        
        if (response.status == 400)
        {
            throw new Error(response.statusText);   
        }
    }
}

export const UserServiceInstance = new UserService();