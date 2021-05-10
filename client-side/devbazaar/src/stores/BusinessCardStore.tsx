import { makeAutoObservable, runInAction } from 'mobx';

import { IBusinessPage } from '../common';
import { IBusiness } from '../models/contracts';
import { IBusinessCardService } from '../services/contracts';

export class BusinessCardStore
{
    businessCardService: IBusinessCardService;
    
    businessCardList: IBusiness[] = [];

    constructor (businessCardService: IBusinessCardService)
    {
        makeAutoObservable(this, { businessCardService: false });

        this.businessCardService = businessCardService;
    }

    /**
     * Fetches a page of business cards with applied filters.
     */
    async fetchBusinessCardPage (pageData: IBusinessPage): Promise<void>
    {
        let p = {
            PageNumber: pageData.PageNumber
        } as IBusinessPage;

        let response = await this.businessCardService.fetchPage(p);

        runInAction(() => this.businessCardList = response.data);
    }
}