import { Task } from "../Task";

export interface ITask
{
    id?: string
    description?: string;
    lowPrice?: number;
    highPrice?: number;
    dateAdded?: Date;
    username?: string;
    email?: string;
}