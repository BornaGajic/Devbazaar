export interface ITask
{
    id?: string

    description?: string;
    title?: string;
    username?: string;
    email?: string;

    lowPrice?: number;
    highPrice?: number;

    dateAdded?: Date;
}