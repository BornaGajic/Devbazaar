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

    async removeFromFavourites (businessCard: Business): Promise<() => void>
    {
        let pageNumber = 0, idx = 0;
        for (let [key, list] of this.clientStore.userStore.rootStore.favoriteBusinessesPageStore.businessCards_)
        {
            let idx = list.findIndex(b => b.id === businessCard.id)
            if (idx !== -1)
            {
                pageNumber = key;
                break;
            }
        }

        runInAction(() => {
            businessCard.isFavourited = false;
        });

        let completeChanges = () => {
            runInAction(() => this.businesses.splice(idx, 1));

            this.service.clientService.removeFromFavourites(businessCard.id!);
            this.clientStore.userStore.rootStore.favoriteBusinessesPageStore.removeFromFavorites(businessCard, pageNumber);
        }

        return completeChanges;
    }

    async addToFavourites (businessCard: Business): Promise<void>
    {        
        if (this.businesses.find(business => business.id === businessCard.id)) // User has un-favorited a card, then changed its mind and favorited again.
        {
            runInAction(() => businessCard.isFavourited = true);
            return;
        }

        runInAction(() => {
            businessCard.isFavourited = true;
            this.businesses.push(businessCard)
        });
        
        this.service.clientService.addToFavourites(businessCard.id!);
        this.clientStore.userStore.rootStore.favoriteBusinessesPageStore.addToFavorites(businessCard);
    }
}