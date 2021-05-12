import { IBusiness, ITask } from ".";

export interface IClient
{
    id?: string;

    about?: string;
    website?: string;
    country?: string;
    city?: string;
    
    postalCode?: number;

    myTasks?: ITask[];
    favBusinesses?: IBusiness[];
}