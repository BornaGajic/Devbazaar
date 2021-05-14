import { AxiosResponse } from "axios";
import { IBusinessPage } from "../../common";
import { ITaskPage } from "../../common/ITaskPage";
import { IBusiness, ICategory } from "../../models/contracts";
import { ITask } from "../../models/contracts/ITask";

export interface IBusinessCardService
{
    createBusinessCard (creationData: IBusiness): Promise<AxiosResponse<IBusiness>>;
    fetchPage (pageData: IBusinessPage): Promise<AxiosResponse<IBusiness[]>>;
    fetchPinnedTasks (pageData?: ITaskPage): Promise<AxiosResponse<ITask[]>>;
    update (data: IBusiness): Promise<void>;
    pinTask (taskId: string): Promise<AxiosResponse<ITask>>;
    removePinnedTask (taskId: string): Promise<AxiosResponse>;
    fetchBusinessCardData (): Promise<AxiosResponse<IBusiness>>;
    fetchCategories (): Promise<AxiosResponse<ICategory[]>>;
    removeCategory (categoryId: string): Promise<AxiosResponse>;
    addCategory (categoryId: string): Promise<AxiosResponse>;
}