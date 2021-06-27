import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { RootStore } from '..';

import { IBusinessPage } from '../../common';
import { Business } from '../../models';
import { IServices } from '../../services/contracts';
import { UiState } from '../ui-store/UiState';

export class BusinessCardPageStore
{ 
    service: IServices;

    isLoading: boolean = true;
    
    // page_number : page_content
    businessCards_: Map<number, Business[]> = new Map<number, Business[]>()

    constructor (public rootStore: RootStore, service: IServices)
    {
        makeAutoObservable(this, { service: false, rootStore: false });

        this.service = service;

        if (rootStore.UiState.isLoggedIn)
        {
            this.loadNextBatch();
        }
    }

    /**
     * fetches next batch of business cards
     */
    async loadNextBatch (): Promise<void>
    {
        Promise.all([
            await this.fetchBusinessCardPage({ PageNumber: 1 }),
            await this.fetchBusinessCardPage({ PageNumber: 2 }),
            await this.fetchBusinessCardPage({ PageNumber: 3 })
        ]).then(() => runInAction(() => this.isLoading = false));
    }

    /**
     * Fetches a page of business cards with applied filters.
     */
    async fetchBusinessCardPage (pageData: IBusinessPage): Promise<void>
    {
        let response = await this.service.businessCardService.fetchPage(pageData);
        
        if (response.data.length === 0) return;

        runInAction(() => {
            if (this.businessCards_.has(pageData.PageNumber) === false)
            {
                this.businessCards_.set(pageData.PageNumber, []);
            }

            response.data.forEach(item => {
            
                let bCard = new Business(this.service);
                bCard.id = item.id;
                bCard.data = item;

                this.businessCards_.get(pageData.PageNumber)!.push(bCard);
            });
        });
    }
}