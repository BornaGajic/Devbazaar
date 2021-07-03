/**
 * ---------------
 * Base user store
 * ---------------
 */

import jwtDecode from 'jwt-decode';
import { makeAutoObservable, runInAction } from 'mobx';

import { RootStore } from '..';
import { ClientStore } from './client-stores';

import { Business, User } from '../../models';
import { UserRole } from '../../common';
import { Client } from '../../models';

import { IUser } from '../../models/contracts';
import { IServices } from '../../services/contracts';
import { IRole } from '../../common';
import { BusinessStore } from './business-stores/BusinessStore';

// TODO: business / client store should be initialised lazely, because only one is needed. 

export class UserStore
{
    rootStore: RootStore;
    clientStore: ClientStore;
    businessStore: BusinessStore;

    service: IServices;

    user: User;

	roleData: Map<string, IRole> = new Map<string, IRole>();

    constructor (rootStore: RootStore, service: IServices)
    {
		this.user = new User(service);
		
      	makeAutoObservable(this, {
            rootStore: false, 
            clientStore: false,
            businessStore: false,
            service: false
        });

        this.rootStore = rootStore;
        this.clientStore = new ClientStore(this, service);
        this.businessStore = new BusinessStore(this, service);

        this.service = service;

		if (localStorage.getItem('token'))
		{
            this.rootStore.UiState.isLoggedIn = true;
			this.fetchUserData(localStorage.getItem('token') as string);
		}
    }

    /**
     * Updates objects fields with the data from the token and initializes users role
     * @param token jwt-token
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
            
            this.user.data = {
                username: payload['Username'],
                email: payload['Email'],
                role: payload['Role'] as UserRole,
                logo: payload['Logo']
            } as IUser;
        });

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
				let business: Business = await this.businessStore.initBusiness();
                
                runInAction(() => this.roleData.set(this.user.role, business));
				break;
            case UserRole.CLIENT:
                let client: Client = await this.clientStore.initClient();
                
                runInAction(() => this.roleData.set(this.user.role, client));
                break;
			default:
				break;
		}
	}
}