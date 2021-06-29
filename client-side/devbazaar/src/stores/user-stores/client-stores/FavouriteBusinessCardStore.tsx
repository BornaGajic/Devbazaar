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

    async removeFromFavourites (businessCard: Business): Promise<() => void>
    {
        runInAction(() => {
            businessCard.isFavourited = false;
        });

        let completeChanges = async () => {
            let favBusPageStore = this.clientStore.userStore.rootStore.favoriteBusinessesPageStore;
            let busPageStore = this.clientStore.userStore.rootStore.businessPageStore;

            let pageNumberFav = -1, idxFav = -1;
            for (let [key, list] of favBusPageStore.businessCards_)
            {
                idxFav = list.findIndex(b => b.id === businessCard.id)
                if (idxFav !== -1)
                {
                    pageNumberFav = key;
                    break;
                }
            }
            let pageNumber = -1, idx = -1;
            for (let [key, list] of busPageStore.businessCards_)
            {
                idx = list.findIndex(b => b.id === businessCard.id)
                if (idx !== -1)
                {
                    pageNumber = key;
                    break;
                }
            }
            
            if (idx !== -1 && idxFav !== -1)
            {
                runInAction(() => {
                    favBusPageStore.businessCards_.get(pageNumberFav)!.find(b => b.id === businessCard.id)!.isFavourited = false;
                    busPageStore.businessCards_.get(pageNumber)!.find(b => b.id === businessCard.id)!.isFavourited = false;
                    
                    this.businesses.splice(idxFav, 1);
                });
    
                await favBusPageStore.removeFromFavorites(businessCard, pageNumberFav)
                                     .then(() => runInAction(() => this.businesses.sort()));
                
                this.service.clientService.removeFromFavourites(businessCard.id!);
            }
            
        }

        return completeChanges;
    }

    async addToFavourites (businessCard: Business): Promise<void>
    {        
        if (this.businesses.find(business => business.id === businessCard.id)) // User has un-favorited a card, then changed its mind and favorited again.
        {
            console.log(businessCard);

            console.log(toJS(this.businesses));


            runInAction(() => businessCard.isFavourited = true);
        }
        else
        {
            runInAction(() => {
                businessCard.isFavourited = true;
                this.businesses.push(businessCard)
            });
            
            await this.clientStore.userStore.rootStore.favoriteBusinessesPageStore.addToFavorites(businessCard)
                                                                                  .then(() => runInAction(() => this.businesses.sort()));
            this.service.clientService.addToFavourites(businessCard.id!);
        }
    }
}