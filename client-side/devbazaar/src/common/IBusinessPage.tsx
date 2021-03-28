import { IPage } from "./IPage";

export interface IBusinessPage extends IPage
{
    Availability?: boolean;
    City?: string;
    Country?: string;
    Username?: string;

    ByNameAsc?: boolean;
    ByFavouriteCount?: boolean;
}