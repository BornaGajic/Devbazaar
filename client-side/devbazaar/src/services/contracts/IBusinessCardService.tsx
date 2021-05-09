import { AxiosResponse } from "axios";
import { IBusinessPage } from "../../common";
import { IBusiness } from "../../models/contracts";

export interface IBusinessCardService
{
    fetchPage (pageData: IBusinessPage): Promise<AxiosResponse<IBusiness[]>>;
    updateAsync (data: IBusiness): Promise<void>;
    pinTask (taskId: string): Promise<void>;
}