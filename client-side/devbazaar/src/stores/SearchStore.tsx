import { makeAutoObservable } from "mobx";
import { RootStore } from ".";

export class SearchStore
{
    query: string = '';
    isSubmited: boolean = false;

    constructor (public rootStore: RootStore)
    {
        makeAutoObservable(this, { rootStore: false });
    }
}