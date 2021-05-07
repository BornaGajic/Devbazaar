import { makeAutoObservable } from 'mobx';

import { RootStore } from '../stores';

import { BusinessServiceInstance } from '../services';

import { IBusinessPage } from '../common';
import { IBusiness } from '../models/contracts';

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