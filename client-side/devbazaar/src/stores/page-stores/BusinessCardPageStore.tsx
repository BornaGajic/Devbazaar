import { IReactionDisposer, makeAutoObservable, reaction, runInAction, toJS } from 'mobx';
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
    }

    /**
     * fetches next batch of business cards
     */
    async loadNextBatch (clear: boolean, search?: string): Promise<void>
    {
        if (clear) this.businessCards_.clear();

        runInAction(() => this.isLoading = true);

        Promise.all([
            await this.fetchBusinessCardPage({ PageNumber: 1, Username: search }),
            await this.fetchBusinessCardPage({ PageNumber: 2, Username: search }),
            await this.fetchBusinessCardPage({ PageNumber: 3, Username: search })
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
            
                let bCard = new Business(this.service, this.rootStore.categoryStore);
                bCard.id = item.id;
                bCard.data = item;

                this.businessCards_.get(pageData.PageNumber)!.push(bCard);
            });
        });
    }

}