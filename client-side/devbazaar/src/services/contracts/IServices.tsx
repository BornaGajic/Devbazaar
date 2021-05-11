import { IBusinessCardService, IUserService, ITaskService, IClientService, IAuthService } from ".";

export interface IServices
{
    businessCardService: IBusinessCardService;
    userService: IUserService;
    taskService: ITaskService;
    clientService: IClientService;
    authService: IAuthService;
}