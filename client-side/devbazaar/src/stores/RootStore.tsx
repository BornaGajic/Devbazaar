import { UserStore } from './UserStore'
import { BusinessStore } from './BusinessStore';
import { TaskStore } from './TaskStore';

class RootStore
{
    UserStore: UserStore;
    BusinessStore: BusinessStore;
    TaskStore: TaskStore;

    constructor ()
    {
        this.UserStore = new UserStore(this);
        this.BusinessStore = new BusinessStore(this);
        this.TaskStore = new TaskStore(this);
    }
}

export default RootStore