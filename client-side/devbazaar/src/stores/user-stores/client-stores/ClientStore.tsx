/**
 * -------------------
 * Client store (Role)
 * -------------------
 */

import { makeAutoObservable, runInAction } from "mobx";

import { UserStore } from "../UserStore";
import { ClientTaskStore } from "./C_TaskStore";
import { FavouriteBusinessCardStore } from "./C_BusinessCardStore";

import { Client } from "../../../models";

import { IServices } from "../../../services/contracts";

export class ClientStore
{
    userStore: UserStore;
    taskStore: ClientTaskStore;
    businessStore: FavouriteBusinessCardStore;

    service: IServices;

    client: Client;

    constructor (userStore: UserStore, service: IServices)
    {
        makeAutoObservable(this, { userStore: false, taskStore: false, service: false })

        this.userStore = userStore;
        this.taskStore = new ClientTaskStore(this, service);
        this.businessStore = new FavouriteBusinessCardStore(this, service);

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

        this.taskStore.loadTasks()
        this.businessStore.loadFavouriteBusinesses();

        runInAction(() => {
            this.client.data = response.data;
        });

        return this.client as Client;
    }
}