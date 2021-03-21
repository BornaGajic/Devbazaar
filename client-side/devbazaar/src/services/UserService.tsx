import axios from 'axios'

import { IUserService } from './contracts'

class UserService implements IUserService
{
    constructor ()
    {
    }
    
    async LoginAsync (email: string, password: string)
    {
        let reponse = await axios.get(`${axios.defaults.baseURL}/Login`,
        {
            data : {
                loginData : {
                    Email : email,
                    Password : password
                }
            }
        });

        return reponse.data;
    }

    async RegisterAsync (username: string, password: string, email: string)
    {
        
    }

    async UpdateAsync (username?: string, password?: string, email?: string, logo?: string)
    {

    }
}

export const UserServiceInstance = new UserService();