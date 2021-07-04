export interface ITask
{
    id?: string

    description?: string;
    title?: string;
    username?: string;
    email?: string;

    image?: string;

    lowPrice?: number;
    highPrice?: number;

    dateAdded?: Date;
}