import { makeAutoObservable } from "mobx";
import RootStore from "../RootStore";

export class UiState
{
    isLoggedIn: boolean = localStorage.getItem('token') ? true : false;
    isLoadingPage: boolean = false;

    currentPage: number = 1;
    
    maxBusinessCardPages: number = 1;
    maxTaskPages: number = 1;

    itemsPerPage: number = 6;

    constructor (public rootStore: RootStore)
    {
        makeAutoObservable(this);
    }
}