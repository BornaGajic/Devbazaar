export interface IBusiness
{
    Id?: string;
    description?: string;
    about?: string;
    website?: string;
    country?: string;
    city?: string;
    PostalCode?: number;
    available?: boolean;
    popularity?: number;

    categories?: [];
}