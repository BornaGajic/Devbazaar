import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';

import { IBusinessPage } from '../common';
import { IBusiness } from '../models/contracts';
import { IBusinessCardService } from '../services/contracts';

export class BusinessCardStore
{
    rootStore: RootStore;
    businessCardService: IBusinessCardService;
    
    businessCardList: IBusiness[] = [];

    constructor (rootStore: RootStore, businessCardService: IBusinessCardService)
    {
        makeAutoObservable(this, { rootStore: false, businessCardService: false });

        this.rootStore = rootStore;
        this.businessCardService = businessCardService;
    }

    /**
     * Fetches a (sorted) page of business cards with defined filters and page number.
     */
    async fetchBusinesses (pageData: IBusinessPage): Promise<void>
    {
        let p = {
            PageNumber: pageData.PageNumber
        } as IBusinessPage;

        let response = await this.businessCardService.fetchPage(p);

        this.businessCardList = response.data;
    }
}