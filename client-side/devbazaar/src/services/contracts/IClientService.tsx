import { AxiosResponse } from "axios";

import { IBusiness, IClient } from "../../models/contracts";

export interface IClientService 
{
    update (data: IClient): Promise<AxiosResponse<any>>;
    addToFavourites (businessCardId: string): Promise<AxiosResponse<IBusiness>>;
}