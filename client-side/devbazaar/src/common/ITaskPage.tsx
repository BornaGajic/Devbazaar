import { IPage } from ".";

export interface ITaskPage extends IPage
{
    // filter
    LowPrice?: number;
    HighPrice?: number;

    // sort
    OldestDate?: boolean;
}