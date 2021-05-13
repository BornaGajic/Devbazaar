import { IBusiness, ITask } from ".";

export interface IClient
{
    id?: string;

    username?: string;
    email?: string;
    about?: string;
    website?: string;
    country?: string;
    city?: string;
    
    postalCode?: number;
}