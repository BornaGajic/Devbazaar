import { AxiosResponse } from "axios";

import { IBusiness, IClient, ITask } from "../../models/contracts";

export interface IClientService 
{
    update (data: IClient): Promise<AxiosResponse>;
    addToFavourites (businessCardId: string): Promise<AxiosResponse<IBusiness>>;
    fetchClientData (): Promise<AxiosResponse<IClient>>;
    fetchFavouriteBusinesses (): Promise<AxiosResponse<IBusiness[]>>;
    fetchTasks (): Promise<AxiosResponse<ITask[]>>;
    removeFromFavourites (businessCardId: string): Promise<AxiosResponse>;
}