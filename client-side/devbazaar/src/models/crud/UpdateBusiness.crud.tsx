export interface UpdateBusiness
{
    username?: string;
    email?: string;

    description?: string;
    about?: string;
    website?: string;
    country?: string;
    city?: string;
    
    postalCode?: number;
    popularity?: number;

    available?: boolean;
}