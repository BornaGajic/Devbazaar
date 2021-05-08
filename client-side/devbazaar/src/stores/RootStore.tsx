import { UserStore } from './UserStore'
import { BusinessCardStore } from './BusinessCardStore';
import { TaskStore } from './TaskStore';

import { BusinessCardService, UserService, TaskService } from '../services'

class RootStore
{
    userStore: UserStore;
    businessStore: BusinessCardStore;
    taskStore: TaskStore;

    private businessCardService: BusinessCardService;
    private userService: UserService;
    private taskService: TaskService;

    constructor ()
    {
        this.businessCardService = new BusinessCardService();
        this.userService = new UserService();
        this.taskService = new TaskService();

        this.userStore = new UserStore(this, this.userService);
        this.businessStore = new BusinessCardStore(this);
        this.taskStore = new TaskStore(this);
    }
}

export default RootStore