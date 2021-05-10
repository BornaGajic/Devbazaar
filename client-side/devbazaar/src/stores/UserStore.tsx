import jwtDecode from 'jwt-decode';
import { makeAutoObservable, runInAction } from 'mobx';

import { RootStore } from '.';

import { Business, User } from '../models';

import { IUser } from '../models/contracts';
import { IUserService } from '../services/contracts';
import { IRole } from '../common';

import { UserRole } from '../common';

export class UserStore
{
    rootStore: RootStore;
	userService: IUserService;

    user: User;
	roleData: Map<string, IRole> = new Map<string, IRole>();

    constructor (rootStore: RootStore, userService: IUserService)
    {
		this.user = new User(userService);
		
      	makeAutoObservable(this, { userService: false, rootStore: false });

        this.userService = userService;
        this.rootStore = rootStore;

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

		switch (this.user.role) 
		{
			case UserRole.BUSINESS:
				let business: Business = new Business(this.rootStore.businessStore.businessCardService);
				let response = await this.userService.fetchRoleData();

				runInAction(() => business.data = response.data);

                runInAction(() => this.roleData.set(this.user.role, business));
				
				break;
		
			default:
				break;
		}
	}
}