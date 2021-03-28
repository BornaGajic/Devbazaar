export interface IBusiness
{
    Id?: string;
    Description?: string;
    About?: string;
    Website?: string;
    Country?: string;
    City?: string;
    PostalCode?: number;
    Available?: boolean;
    Popularity?: number;

    Categories?: [];
}