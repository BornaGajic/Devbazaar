import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';

import { IBusinessPage } from '../common';
import { IBusiness } from '../models/contracts';

export class BusinessCardStore
{
    businessCardList: IBusiness[] = [];

    constructor ()
    {
        makeAutoObservable(this);
    }

    /**
     * Fetches a (sorted) page of business cards with defined filters and page number.
     */
    async fetchBusinesses (pageData: IBusinessPage): Promise<void>
    {
        let p = {
            PageNumber: pageData.PageNumber
        } as IBusinessPage;

        //this.businessCardList = await this.fetchPage(p);
    }
}