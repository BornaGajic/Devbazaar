import { makeAutoObservable, runInAction } from "mobx";

import { RootStore } from ".";

import { Category } from "../models/Category";

import { IServices } from "../services/contracts";


export class CategoryStore
{
    rootStore: RootStore;

    service: IServices;
    
    readonly categories: Category[] = [];

    constructor (rootStore: RootStore, service: IServices)
    {
        makeAutoObservable(this, { service: false, rootStore: false });

        this.rootStore = rootStore;

        this.service = service;

        if (rootStore.UiState.isLoggedIn)
        {
            this.loadCategories();
        }
    }

    async loadCategories (): Promise<void>
    {
        let response = await this.service.businessCardService.fetchCategories();

        response.data.forEach(category => {
            let newCategory = new Category();
            
            runInAction(() => {
                newCategory.id = category.id;
                newCategory.name = category.name;

                this.categories.push(newCategory);
            });
        });
    }
}