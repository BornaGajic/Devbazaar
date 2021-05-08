import { IBusinessPage } from "../../common";
import { IBusiness } from "../../models/contracts";

export interface IBusinessCardService
{
    fetchPage (pageData: IBusinessPage): Promise<IBusiness[]>;
    updateAsync (data: IBusiness): Promise<void>;
}