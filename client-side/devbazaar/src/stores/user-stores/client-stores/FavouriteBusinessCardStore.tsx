/**
 * -----------------------------
 * Client's favourite businesses
 * -----------------------------
 */

import { makeAutoObservable, runInAction } from "mobx";

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
            let nFavBusiness = new Business(this.service);
            nFavBusiness.id = business.id;
            nFavBusiness.data = business;

            runInAction(() => this.businesses.push(nFavBusiness));
        });
    }

    async removeFromFavourites (businessCard: Business): Promise<void>
    {
        let idx = this.businesses.findIndex(business => business.id === businessCard.id);
        let cardPage = (idx % this.clientStore.userStore.rootStore.UiState.itemsPerPage) + 1;

        businessCard.isFavourited = false;

        runInAction(() => this.businesses.splice(idx, 1));

        this.service.clientService.removeFromFavourites(businessCard.id!);
        this.clientStore.userStore.rootStore.favoriteBusinessesPageStore.removeFromFavorites(businessCard, cardPage);
    }

    async addToFavourites (businessCard: Business): Promise<void>
    {
        let response = await this.service.clientService.addToFavourites(businessCard.id!);
        businessCard.isFavourited = true;

        this.clientStore.userStore.rootStore.favoriteBusinessesPageStore.addToFavorites(businessCard);

        runInAction(() => this.businesses.push(businessCard));
    }
}