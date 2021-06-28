import { makeAutoObservable, runInAction } from "mobx";
import { Business } from "../../models";
import { IServices } from "../../services/contracts";
import RootStore from "../RootStore";
import { UiState } from "../ui-store/UiState";

export class FavoriteBusinessesPageStore
{
    service: IServices;

    isLoading: boolean = true;

    businessCards_: Map<number, Business[]> = new Map<number, Business[]>();

    constructor (public rootStore: RootStore, service: IServices)
    {
        makeAutoObservable(this, { rootStore: false, service: false });

        this.service = service;
    }

    async loadFavoriteBusinesses (): Promise<void>
    {
        let pageNumber = 1;
        let favoriteBusinesses = this.rootStore.userStore.clientStore.favouriteBusinessStore.businesses;

        runInAction(() => {
            let ipp = this.rootStore.UiState.itemsPerPage;
            
            for (let i = 0; i <= favoriteBusinesses.length; i += ipp, pageNumber++)
            {
                this.businessCards_.set(pageNumber, favoriteBusinesses.slice(i, ipp));
            }

            this.isLoading = false
        });
    }

    async addToFavorites (business: Business)
    {   
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
        })
        
    }

    async removeFromFavorites (business: Business, cardsPageNumber: number)
    {
        if (this.businessCards_.get(cardsPageNumber)!.length - 1 === 0)
        {            
            for (let i = cardsPageNumber; i <= this.businessCards_.size; i++)
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

            runInAction(() => this.businessCards_.delete(cardsPageNumber));

            if (this.businessCards_.size === 0)
            {            
                runInAction(() => this.businessCards_.set(1, []));
            }
        }
        else
        {
            let idx = this.businessCards_.get(cardsPageNumber)!.findIndex(b => b.id === business.id);

            runInAction(() => this.businessCards_.get(cardsPageNumber)!.splice(idx, 1));
        }
    }
}