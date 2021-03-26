import RootStore from './RootStore';
import { User } from './UserStore';

import { BusinessServiceInstance } from '../services/BusinessService';



export class BusinessStore 
{
    private RootStore: RootStore;
    Business: Business;

    constructor (rootStore: RootStore)
    {
        this.RootStore = rootStore;
        this.Business = new Business(rootStore.UserStore.User);
    }
}

export class Business 
{
    User: User;

    Description?: string;
    About?: string;
    Website?: string;
    Country?: string;
    City?: string;
    Available?: boolean;
    Categories?: [];

    constructor (user: User)
    {
        this.User = user;
    }

    updateAsyc (data: any): void
    {
        
    }
}