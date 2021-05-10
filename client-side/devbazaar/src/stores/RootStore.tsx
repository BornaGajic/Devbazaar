import { UserStore } from './UserStore'
import { BusinessCardStore } from './BusinessCardStore';
import { TaskStore } from './TaskStore';
import { AuthStore } from './AuthStore';

import { BusinessCardService, UserService, TaskService, AuthService } from '../services'
import { IAuthService, IBusinessCardService, IClientService, ITaskService, IUserService } from '../services/contracts';
import { ClientService } from '../services/ClientService';

class RootStore
{
    userStore: UserStore;
    businessStore: BusinessCardStore;
    taskStore: TaskStore;
    authStore: AuthStore

    private businessCardService: IBusinessCardService = new BusinessCardService();
    private userService: IUserService = new UserService();
    private taskService: ITaskService = new TaskService();
    private clientService: IClientService = new ClientService();
    private authService: IAuthService = new AuthService();

    constructor ()
    {
        this.businessStore = new BusinessCardStore(this.businessCardService);
        this.userStore = new UserStore(this, this.userService, this.clientService);
        this.taskStore = new TaskStore(this, this.taskService);
        this.authStore = new AuthStore(this, this.authService);
    }
}

export default RootStore