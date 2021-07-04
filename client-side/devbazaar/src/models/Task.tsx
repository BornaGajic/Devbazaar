import { makeAutoObservable, runInAction } from "mobx";
import Helper from "../common/Helper";

import { ITask } from "./contracts";

export class Task implements ITask
{
    id?: string;

    description?: string;
    title?: string;
    username?: string;
    email?: string;

    image?: string;

    lowPrice?: number;
    highPrice?: number;

    dateAdded?: Date;
    
    constructor ()
    {
        makeAutoObservable(this);
    }

    get asJson (): Object
    {
        return {
            Id: this.id,
            Description: this.description,
            Title: this.title,
            LowPrice: this.lowPrice,
            HighPrice: this.highPrice,
            DateAdded: this.dateAdded,
            Username: this.username,
            Email: this.email
        
        }
    }

    set data (data: ITask)
    {
        this.description = data.description ?? this.description;
        this.title = data.title ?? this.title;
        this.lowPrice = data.lowPrice ?? this.lowPrice;
        this.highPrice = data.highPrice ?? this.highPrice;
        this.username = data.username ?? this.username;
        this.email = data.email ?? this.email;
        this.dateAdded = data.dateAdded ?? this.dateAdded;

        Helper.Base64ToBlob(data.image ?? '').then(blob => {
           runInAction(() => this.image = data.image ? URL.createObjectURL(blob) : this.image)
        });
    }
}