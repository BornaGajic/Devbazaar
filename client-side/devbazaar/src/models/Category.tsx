import { makeAutoObservable } from "mobx";
import { IServices } from "../services/contracts";
import { ICategory } from "./contracts/ICategory";

export class Category implements ICategory
{
    service: IServices;

    id?: string;
    name?: string;

    constructor (service: IServices)
    {
        makeAutoObservable(this, { service: false });

        this.service = service;
    }
}