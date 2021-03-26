import RootStore from './RootStore';
import { User } from './UserStore';

import { BusinessServiceInstance } from '../services/BusinessService';
import { timeStamp } from 'node:console';



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
        this.Description = data.Description ?? this.Description;
        this.About = data.About ?? this.About;
        this.Website = data.Website ?? this.Website;
        this.Country = data.Country ?? this.Country;
        this.City = data.City ?? this.City;
        this.Available = data.Available ?? this.Available;
        this.Categories = data.Categories ?? this.Categories;
    }
}