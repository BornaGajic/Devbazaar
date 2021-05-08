import jwtDecode from 'jwt-decode';
import { makeAutoObservable } from 'mobx';

import { Business, User } from '../models';
import { IUser } from '../models/contracts';
import { IUserService } from '../services/contracts/IUserService';
import { IRole } from '../common';

export class UserStore
{
	userService: IUserService;

    user: User;
	roleData: Map<string, IRole> = new Map<string, IRole>();

    constructor (userService: IUserService)
    {
		this.user = new User(this, userService);
		this.userService = userService;

      	makeAutoObservable(this, { userService: false });

		if (localStorage.getItem('token'))
		{
			this.loginAsync(localStorage.getItem('token') as string);
		}
    }

    /**
     * Logs in the user and updates its fields
     */
    async loginAsync (token: string): Promise<void>
    {
		let payload: jwtPayload = jwtDecode(token);

        this.user.id = payload['Id'];
        this.user.update({
            username: payload['Username'],
            email: payload['Email'],
            role: payload['Role'],
            logo: payload['Logo']
        } as IUser);

        await this.fetchRoleData();
    }

	/**
     * Fetches business or client data from the server. (Depends on a role of the user).
     * And saves it as a new key value pair in the RoleData map.
     * Throws Error if RoleData already has defined key value pair.
     */
	public async fetchRoleData (): Promise<void>
	{
		if (this.roleData.has(this.user.role)) 
			throw new Error("RoleActions for this Role already exist.");

		switch (this.user.role) 
		{
			case 'Business':
				let business: Business = new Business();
				business.data = await this.userService.fetchRoleData();
				
				this.roleData.set(this.user.role, business);
				break;
		
			default:
				break;
		}
	}
}

// this is temporary here
interface jwtPayload
{
    Id: string;
    Username: string;
    Email: string;
    Role: string;
    Logo: string;
}