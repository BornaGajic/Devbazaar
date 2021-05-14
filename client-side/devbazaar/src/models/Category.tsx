import { makeAutoObservable } from "mobx";
import { ICategory } from "./contracts";

export class Category implements ICategory
{
    id?: string;

    name?: string;

    constructor ()
    {
        makeAutoObservable(this);
    }
}