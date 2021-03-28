import RootStore from './RootStore';
import { User } from './UserStore';

import { BusinessServiceInstance } from '../services/BusinessService';
import { IBusinessPage } from '../common';
import { makeAutoObservable } from 'mobx';
import { IBusiness } from './contracts/IBusiness';


export class BusinessStore 
{
    private RootStore: RootStore;
    businessList: IBusiness[] = [];

    constructor (rootStore: RootStore)
    {
        makeAutoObservable(this);

        this.RootStore = rootStore;
    }

    async fetchPage (pageData: IBusinessPage): Promise<void>
    {
        let p = {
            PageNumber: pageData.PageNumber
        } as IBusinessPage;

        this.businessList = await BusinessServiceInstance.fetchPage(p);
    }
}

export class Business 
{
    Description?: string;
    About?: string;
    Website?: string;
    Country?: string;
    City?: string;
    Available?: boolean;
    Popularity?: number;
    Categories?: [];

    constructor ()
    {
        makeAutoObservable(this);
    }

    update (data: any): void
    {
        this.Description = data.Description ?? this.Description;
        this.About = data.About ?? this.About;
        this.Website = data.Website ?? this.Website;
        this.Country = data.Country ?? this.Country;
        this.City = data.City ?? this.City;
        this.Available = data.Available ?? this.Available;
        this.Categories = data.Categories ?? this.Categories;
        this.Popularity = data.Popularity ?? this.Popularity;
    }
}