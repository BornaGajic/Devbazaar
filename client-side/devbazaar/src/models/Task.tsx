import { makeAutoObservable } from "mobx";

import { ITask } from "./contracts";

export class Task implements ITask
{
    id?: string;

    description?: string;
    username?: string;
    email?: string;

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
        this.dateAdded = data.dateAdded ?? this.dateAdded;
    }
    
}