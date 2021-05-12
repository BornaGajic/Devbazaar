import { ICategory } from ".";
import { Category } from "..";

export interface IBusiness
{
    id?: string;
    
    description: string;
    about?: string;
    website?: string;
    country: string;
    city: string;
    postalCode: number;
    available: boolean;
    popularity?: number;

    categories?: ICategory[];
}