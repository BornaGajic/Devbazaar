import { makeAutoObservable, runInAction } from 'mobx';

import { IBusinessPage } from '../common';
import { IBusiness } from '../models/contracts';
import { IBusinessCardService, IServices } from '../services/contracts';

export class BusinessCardStore
{ 
    service: IServices;
    
    businessCards: IBusiness[] = [];

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
    }

    /**
     * Fetches a page of business cards with applied filters.
     */
    async fetchBusinessCardPage (pageData: IBusinessPage): Promise<void>
    {
        let response = await this.service.businessCardService.fetchPage(pageData);

        runInAction(() => {
            this.businessCards = this.businessCards.length !== 0 ? this.businessCards.concat(response.data) : response.data
        });
    }
}