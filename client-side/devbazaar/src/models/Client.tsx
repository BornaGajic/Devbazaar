import { makeAutoObservable } from "mobx";
import { IServices } from "../services/contracts";

import { IClient, ITask, IBusiness } from "./contracts";

export class Client implements IClient
{
    service: IServices;

    myTasks?: ITask[];
    favBusinesses?: IBusiness[];

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
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
        let response = await this.service.clientService.addToFavourites(businessCardId);

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