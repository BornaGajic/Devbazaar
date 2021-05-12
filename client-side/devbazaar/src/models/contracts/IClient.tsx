import { Business } from "..";
import { Task } from "../Task";

export interface IClient
{
    about?: string;
    website?: string;
    country?: string;
    city?: string;
    
    postalCode?: number;

    myTasks?: Task[];
    favBusinesses?: Business[];
}