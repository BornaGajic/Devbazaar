import { makeAutoObservable } from "mobx";
import { IClientService } from "../services/contracts";
import { BusinessCardStore } from "../stores/BusinessCardStore";

import { IClient, ITask, IBusiness } from "./contracts";

export class Client implements IClient
{
    businessCardStore: BusinessCardStore;
    clientService: IClientService;

    myTasks?: ITask[];
    favBusinesses?: IBusiness[];

    constructor (businessStore: BusinessCardStore, clientService: IClientService)
    {
        makeAutoObservable(this, { businessCardStore: false, clientService: false });

        this.clientService = clientService;
        this.businessCardStore = businessStore
    }

    /**
     * @deprecated Dodati na backand stvari da ovo ima smisla
     */
    async update (data: IClient): Promise<void>
    {
        // Smisliti koje stvari staviti na klijenta (username? itd.)
    }

    async addToFavourites (businessCardId: string): Promise<void>
    {
        let response = await this.clientService.addToFavourites(businessCardId);

        this.favBusinesses?.push(response.data);
    }

    get asJson (): Object
    {
        return {
            Tasks: this.myTasks,
            FavoriteBusinesses: this.favBusinesses
        };
    }

    set data (data: IClient)
    {
        this.myTasks = data.myTasks ?? this.myTasks;
        this.favBusinesses = data.favBusinesses ?? this.favBusinesses;
    }
}