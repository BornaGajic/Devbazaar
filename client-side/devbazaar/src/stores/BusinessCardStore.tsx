import { makeAutoObservable, runInAction } from 'mobx';

import { IBusinessPage } from '../common';
import { IBusiness } from '../models/contracts';
import { IBusinessCardService } from '../services/contracts';

export class BusinessCardStore
{
    businessCardService: IBusinessCardService;
    
    businessCards: IBusiness[] = [];

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
        let response = await this.businessCardService.fetchPage(pageData);

        runInAction(() => {
            this.businessCards = this.businessCards.length !== 0 ? this.businessCards.concat(response.data) : response.data
        });
    }
}