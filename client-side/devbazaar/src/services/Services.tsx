import { UserService } from './UserService';
import { BusinessCardService } from './BusinessCardService';
import { TaskService } from './TaskService';
import { AuthService } from './AuthService';
import { ClientService } from './ClientService';

import { IAuthService, IBusinessCardService, IClientService, IServices, ITaskService, IUserService } from './contracts';

export class Services implements IServices
{
    businessCardService: IBusinessCardService = new BusinessCardService();
    userService: IUserService = new UserService();
    taskService: ITaskService = new TaskService();
    clientService: IClientService = new ClientService();
    authService: IAuthService = new AuthService();
}