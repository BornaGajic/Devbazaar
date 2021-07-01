import { makeAutoObservable, runInAction } from "mobx";
import { useHistory } from "react-router";
import { Business } from "../../models";
import { IServices } from "../../services/contracts";
import RootStore from "../RootStore";
import { SearchStore } from "../SearchStore";
import { UiState } from "../ui-store/UiState";

export class FavoriteBusinessesPageStore
{
    service: IServices;

    isLoading: boolean = true;
    favBtnPressed: boolean = false;

    businessCards_: Map<number, Business[]> = new Map<number, Business[]>();

    private searchResults: Map<number, Business[]> = new Map<number, Business[]>();

    constructor (public rootStore: RootStore, service: IServices)
    {
        makeAutoObservable(this, { rootStore: false, service: false });

        this.service = service;
    }

    async swap (searchStore: SearchStore)
    {
        if (searchStore.query !== '')
        {
            let pageNumber = 1;
            let ipp = this.rootStore.UiState.itemsPerPage;

            this.searchResults.clear();
            this.searchResults.set(pageNumber, []);

            let favoriteBusinesses = this.rootStore.userStore.clientStore.favouriteBusinessStore.businesses;
            let regex = new RegExp(`${searchStore.query}`, 'gi');

            let filtered = favoriteBusinesses.filter(value => {
                return value.username?.match(regex)?.length ?? -1 > 0;
            });

            for (let i = 0; i <= filtered.length; i += ipp, pageNumber++)
            {
                this.searchResults.set(pageNumber, filtered.slice(i, ipp));
            }

            [this.businessCards_, this.searchResults] = [this.searchResults, this.businessCards_];
        }
    }

    async loadFavoriteBusinesses (): Promise<void>
    {
        let pageNumber = 1;
        let favoriteBusinesses = this.rootStore.userStore.clientStore.favouriteBusinessStore.businesses;

        runInAction(() => {
            let ipp = this.rootStore.UiState.itemsPerPage;
            
            for (let i = 0; i < favoriteBusinesses.length; i += ipp, pageNumber++)
            {
                this.businessCards_.set(pageNumber, favoriteBusinesses.slice(i, ipp));
            }

            this.isLoading = false
        });
    }

    async addToFavorites (business: Business): Promise<() => void>
    {   
        runInAction(() => {
            business.isFavourited = true;
        });

        let completeChanges = async () => {
            let busFavArr = this.businessCards_.get(this.businessCards_.size)!;
            
            runInAction(() => {
                if (busFavArr.length < this.rootStore.UiState.itemsPerPage)
                {
                    this.businessCards_.get(this.businessCards_.size)!.push(business);
                }
                else
                {
                    this.businessCards_.set(this.businessCards_.size + 1, [business]);
                }
            });
            
            this.setIsFavorited(true, business, true);
            this.setIsFavorited(true, business, false);

            this.service.clientService.addToFavourites(business.id!);
        }
        
        return completeChanges;
    }

    async removeFromFavorites (business: Business): Promise<() => void>
    {
        runInAction(() => {
            business.isFavourited = false;
        });

        let completeChanges = async () => {
            let [idxFav, cardsPageNumberFav] = this.setIsFavorited(false, business, true);
            this.setIsFavorited(false, business, false);
        
            if (this.businessCards_.get(cardsPageNumberFav)!.length - 1 === 0)
            {            
                for (let i = cardsPageNumberFav; i <= this.businessCards_.size; i++)
                {   
                    if (i == this.businessCards_.size)
                    {
                        runInAction(() => this.businessCards_.delete(i));
                        
                        break;
                    }
                    else
                    {
                        runInAction(() => this.businessCards_.set(i, this.businessCards_.get(i + 1)!));
                    }
                }
    
                if (this.businessCards_.size === 0)
                {            
                    runInAction(() => this.businessCards_.set(1, []));
                }
            }
            else
            {
                runInAction(() => this.businessCards_.get(cardsPageNumberFav)!.splice(idxFav, 1));
            }
            
            this.service.clientService.removeFromFavourites(business.id!);
        }


        return completeChanges;
    }

    private setIsFavorited (favoriteValue: boolean, business: Business, isFavPage: boolean) 
    {
        let businessCards = isFavPage ? this.businessCards_ : this.rootStore.businessPageStore.businessCards_;
        let idx = -1, pageNumber = -1;

        for (let [key, value] of businessCards)
        {
            idx = value.findIndex(b => b.id === business.id);
            pageNumber = key;
            if (idx !== -1)
            {
                runInAction(() => value[idx].isFavourited = favoriteValue); 
                break;
            } 
        }

        return [idx, pageNumber];
    }
}