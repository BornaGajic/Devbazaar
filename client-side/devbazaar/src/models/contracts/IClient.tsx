import { Business } from "..";
import { Task } from "../Task";

export interface IClient
{
    myTasks?: Task[];
    favBusinesses?: Business[];
}