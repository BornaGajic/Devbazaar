import { IBusiness } from "./IBusiness";
import { ITask } from "./ITask";

export interface IClient
{
    myTasks?: ITask[];
    favBusinesses?: IBusiness[];
}