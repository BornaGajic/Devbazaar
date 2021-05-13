import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '..';

import { IBusinessPage } from '../../common';
import { Business } from '../../models';
import { IServices } from '../../services/contracts';

export class BusinessCardPageStore
{ 
    service: IServices;
    
    businessCards: Business[] = [];

    constructor (public rootStore: RootStore, service: IServices)
    {
        makeAutoObservable(this, { service: false, rootStore: false });

        this.service = service;
    }

    /**
     * Fetches a page of business cards with applied filters.
     */
     // create _real_ tasks - not plain json 
    async fetchBusinessCardPage (pageData: IBusinessPage): Promise<void>
    {
        let response = await this.service.businessCardService.fetchPage(pageData);

        runInAction(() => {
            response.data.forEach(item => {
                let bCard = new Business(this.service);
                bCard.id = item.id;
                bCard.data = item;
                
                this.businessCards.push(bCard);
            });
        });
    }
}