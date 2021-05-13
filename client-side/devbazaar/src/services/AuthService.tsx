import axios from 'axios'

import { IAuthService } from './contracts';

import { IUser } from '../models/contracts';

export class AuthService implements IAuthService
{
    async loginAsync (email: string, password: string): Promise<string>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/User/Login`,
        {
            Email : email,
            Password : password
        });

        if (response.status !== 200)
            throw new Error("Not found");

        return response.data;
    }

    async registerAsync (data: IUser): Promise<string>
    {
        let response = await axios.post(`${axios.defaults.baseURL}/User/Register`,
        {
            Username : data.username,
            Email : data.email,
            Password : data.password
        }, { params : { TypeOfUser : data.role } });

        if (response.status !== 200)
            throw new Error("User already exists!");

        return response.data;
    }
}