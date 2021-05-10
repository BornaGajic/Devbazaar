import { AxiosResponse } from "axios";
import { IBusinessPage } from "../../common";
import { ITaskPage } from "../../common/ITaskPage";
import { IBusiness } from "../../models/contracts";
import { ITask } from "../../models/contracts/ITask";

export interface IBusinessCardService
{
    fetchPage (pageData: IBusinessPage): Promise<AxiosResponse<IBusiness[]>>;
    fetchPinnedTasks (pageData: ITaskPage): Promise<AxiosResponse<ITask[]>>
    updateAsync (data: IBusiness): Promise<void>;
    pinTask (taskId: string): Promise<void>;
}