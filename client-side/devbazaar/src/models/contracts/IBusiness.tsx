import { ICategory } from ".";

export interface IBusiness
{
    id?: string;
    
    description: string;
    about?: string;
    website?: string;
    country: string;
    city: string;

    postalCode: number;
    popularity?: number;

    available: boolean;

    categories?: ICategory[];
}