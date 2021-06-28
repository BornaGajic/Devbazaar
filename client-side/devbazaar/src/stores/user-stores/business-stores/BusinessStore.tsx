import { makeAutoObservable, runInAction } from "mobx";
import { Business } from "../../../models";
import { IServices } from "../../../services/contracts";
import { UserStore } from "../UserStore";
import { PinnedTaskStore } from "./PinnedTaskStore";

export class BusinessStore
{
    userStore: UserStore;
    pinnedTaskStore: PinnedTaskStore;

    service: IServices;

    business: Business;

    constructor (userStore: UserStore, service: IServices)
    {
        makeAutoObservable(this, { 
            userStore: false, 
            pinnedTaskStore: false,
            service: false 
        });

        this.userStore = userStore;
        this.pinnedTaskStore = new PinnedTaskStore(this, service);
        this.service = service;

        this.business = new Business(this.service, this);
    }

    async initBusiness (): Promise<Business>
    {
        let response = await this.service.businessCardService.fetchBusinessCardData();

        this.pinnedTaskStore.loadPinnedTasks();

        runInAction(() => {
            this.business.data = response.data;
            this.business.id = this.userStore.user.id;
        });
        
        return this.business;
    }
}