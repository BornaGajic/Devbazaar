import RootStore from './RootStore';

import { BusinessServiceInstance } from '../services';
import { IBusinessPage } from '../common';
import { makeAutoObservable } from 'mobx';
import { IBusiness } from './contracts/IBusiness';
import { IRole } from '../common/IRole';
import { UserStore } from './UserStore';

export class BusinessStore
{
    private RootStore: RootStore;
    businessList: IBusiness[] = [];

    constructor (rootStore: RootStore)
    {
        makeAutoObservable(this);
        this.RootStore = rootStore;
    }

    /**
     * Fetches a (sorted) page of business cards with defined filters and page number.
     */
    async fetchBusinesses (pageData: IBusinessPage): Promise<void>
    {
        let p = {
            PageNumber: pageData.PageNumber
        } as IBusinessPage;

        this.businessList = await BusinessServiceInstance.fetchPage(p);
    }
}

export class Business implements IBusiness, IRole
{
    private RootStore: RootStore;

    Description?: string;
    About?: string;
    Website?: string;
    Country?: string;
    City?: string;
    Available?: boolean;
    Popularity?: number;
    Categories?: [];

    constructor (rootStore: RootStore)
    {
        makeAutoObservable(this);

        this.RootStore = rootStore;
    }

    /**
     * Updates Business card 
     */
    async update (data: IBusiness): Promise<void>
    {
        BusinessServiceInstance.updateAsync(data);

        this.Description = data.Description ?? this.Description;
        this.About = data.About ?? this.About;
        this.Website = data.Website ?? this.Website;
        this.Country = data.Country ?? this.Country;
        this.City = data.City ?? this.City;
        this.Available = data.Available ?? this.Available;
        this.Categories = data.Categories ?? this.Categories;
        this.Popularity = data.Popularity ?? this.Popularity;
    }

    async pinTask (taskId: string): Promise<void>
    {
        
    }

    /**
    * Returnes Business as Json object 
    */
    get asJson (): Object
    {
        return {
            Description: this.Description,
            About: this.About,
            Website: this.Website,
            Country: this.Country,
            City: this.City,
            Available: this.Available,
            Popularity: this.Popularity,
            Categories: this.Categories
        }
    }

    /**
     * Setter for Business fields
     */
    set data (data: IBusiness)
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