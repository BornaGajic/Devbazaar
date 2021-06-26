/**
 * -------------------
 * Client store (Role)
 * -------------------
 */

import { makeAutoObservable, runInAction } from "mobx";

import { UserStore } from "../UserStore";
import { ClientTaskStore } from "./ClientTaskStore";
import { FavouriteBusinessCardStore } from "./FavouriteBusinessCardStore";

import { Client } from "../../../models";

import { IServices } from "../../../services/contracts";
import { IClient } from "../../../models/contracts";

export class ClientStore
{
    userStore: UserStore;
    clienTaskStore: ClientTaskStore;
    favouriteBusinessStore: FavouriteBusinessCardStore;

    service: IServices;

    client: Client;

    constructor (userStore: UserStore, service: IServices)
    {
        makeAutoObservable(this, { userStore: false, clienTaskStore: false, favouriteBusinessStore: false,  service: false })

        this.userStore = userStore;
        this.clienTaskStore = new ClientTaskStore(this, service);
        this.favouriteBusinessStore = new FavouriteBusinessCardStore(this, service);

        this.service = service;

        this.client = new Client(this.service);
    }

    /**
     * Updates the client's fields, and loads its tasks and favourite businesses.
     * Should be called ONLY once!
     * @returns Initialized Client
     */
    async initClient (): Promise<Client>
    {
        let response = await this.service.clientService.fetchClientData();

        await this.clienTaskStore.loadTasks();
        this.userStore.rootStore.myTaskPageStore.loadMyTasks();

        await this.favouriteBusinessStore.loadFavouriteBusinesses();
        this.userStore.rootStore.favoriteBusinessesPageStore.loadFavoriteBusinesses();

        runInAction(() => {
            this.client.data = response.data;
            this.client.id = this.userStore.user.id;
        });

        return this.client;
    }

    async updateClient (data: IClient): Promise<void>
    {
        runInAction(() => this.client.data = data);

        this.service.clientService.update(data);
    }
}