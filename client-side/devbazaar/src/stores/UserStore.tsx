import jwtDecode from 'jwt-decode';
import { makeAutoObservable, runInAction } from 'mobx';

import { Business, User } from '../models';

import { IUser } from '../models/contracts';
import { IServices } from '../services/contracts';
import { IRole, ITaskPage } from '../common';

import { UserRole } from '../common';
import { Client } from '../models';
import { RootStore } from '.';

export class UserStore
{
    service: IServices;

    user: User;

	roleData: Map<string, IRole> = new Map<string, IRole>();

    constructor (public rootStore: RootStore, service: IServices)
    {
		this.user = new User(service);
		
      	makeAutoObservable(this, { service: false, rootStore: false });

        this.service = service;

		if (localStorage.getItem('token'))
		{
			this.fetchUserData(localStorage.getItem('token') as string);
		}
    }

    /**
     * Logs in the user and updates its fields
     */
    async fetchUserData (token: string): Promise<void>
    {
        interface jwtPayload
        {
            Id: string;
            Username: string;
            Email: string;
            Role: string;
            Logo: string;
        }

		let payload: jwtPayload = jwtDecode(token);

        runInAction(() => {
            this.user.id = payload['Id'];
            this.user.update({
                username: payload['Username'],
                email: payload['Email'],
                role: payload['Role'],
                logo: payload['Logo']
            } as IUser);
        })

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
        
        let response = await this.service.userService.fetchRoleData(this.user.role);
        console.log(response.data);
		switch (this.user.role) 
		{
			case UserRole.BUSINESS:
				let business: Business = new Business(this.service);
                
				business.data = response.data;
                business.fetchPinnedTasks({ PageNumber: 1} as ITaskPage);
                runInAction(() => this.roleData.set(this.user.role, business));
				
				break;
            case UserRole.CLIENT:
                let client: Client = new Client(this.service);

                client.data = response.data;
                runInAction(() => this.roleData.set(this.user.role, client));

                break;
			default:
				break;
		}
	}
}