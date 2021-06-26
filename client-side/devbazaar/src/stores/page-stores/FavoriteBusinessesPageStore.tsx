import { makeAutoObservable, runInAction } from "mobx";
import { Business } from "../../models";
import { IServices } from "../../services/contracts";
import RootStore from "../RootStore";

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
}