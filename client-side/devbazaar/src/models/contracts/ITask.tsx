export interface ITask
{
    id?: string

    description?: string;
    username?: string;
    email?: string;

    lowPrice?: number;
    highPrice?: number;

    dateAdded?: Date;
}