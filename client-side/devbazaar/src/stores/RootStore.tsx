import { UserStore } from './UserStore'
import { BusinessCardStore } from './BusinessCardStore';
import { TaskStore } from './TaskStore';

import { BusinessCardService, UserService, TaskService, AuthService } from '../services'
import { AuthStore } from './AuthStore';

class RootStore
{
    userStore: UserStore;
    businessStore: BusinessCardStore;
    taskStore: TaskStore;
    authStore: AuthStore

    private businessCardService: BusinessCardService;
    private userService: UserService;
    private taskService: TaskService;
    private authService: AuthService;

    constructor ()
    {
        this.businessCardService = new BusinessCardService();
        this.userService = new UserService();
        this.taskService = new TaskService();
        this.authService = new AuthService();

        this.userStore = new UserStore(this.userService);
        this.businessStore = new BusinessCardStore();
        this.taskStore = new TaskStore(this);
        this.authStore = new AuthStore(this, this.authService);
    }
}

export default RootStore