/**
 * -----------------------------
 * Client's favourite businesses
 * -----------------------------
 */

import { makeAutoObservable, runInAction, toJS } from "mobx";

import { ClientStore } from "./ClientStore";

import { Business } from "../../../models";

import { IBusiness } from "../../../models/contracts";
import { IServices } from "../../../services/contracts";

export class FavouriteBusinessCardStore
{
    clientStore: ClientStore;

    service: IServices;

    businesses: Business[] = [];

    constructor (clientStore: ClientStore, service: IServices)
    {
      	makeAutoObservable(this, { clientStore: false, service: false  });

        this.clientStore = clientStore;
        this.service = service;
    }

    async loadFavouriteBusinesses (): Promise<void>
    {
        let response = await this.service.clientService.fetchFavouriteBusinesses();
        
        await this.updateFavouritesFromJson(response.data);
    }

    async updateFavouritesFromJson (data: IBusiness[]): Promise<void>
    {
        data.forEach(business => {
            let nFavBusiness = new Business(this.service, this.clientStore.userStore.rootStore.categoryStore);
            nFavBusiness.id = business.id;
            nFavBusiness.data = business;

            runInAction(() => this.businesses.push(nFavBusiness));
        });
    }
}