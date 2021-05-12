import { makeAutoObservable } from "mobx";
import { Category } from "../models";
import { IServices } from "../services/contracts";

export class CategoryStore
{
    service: IServices;

    categories: Category[] = [];

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
    }
}