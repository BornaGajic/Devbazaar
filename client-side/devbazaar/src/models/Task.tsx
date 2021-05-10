import { makeAutoObservable } from "mobx";

import { ITask } from "./contracts";

export class Task implements ITask
{
    id?: string;
    description?: string;
    lowPrice?: number;
    highPrice?: number;
    dateAdded?: Date;
    username?: string;
    email?: string;

    constructor ()
    {
        makeAutoObservable(this);
    }

    get asJson (): Object
    {
        return {
            Id: this.id,
            Description: this.description,
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
        this.lowPrice = data.lowPrice ?? this.lowPrice;
        this.highPrice = data.highPrice ?? this.highPrice;
        this.username = data.username ?? this.username;
        this.email = data.email ?? this.email;
    }
    
}