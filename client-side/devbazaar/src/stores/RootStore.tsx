import { UserStore } from './UserStore'
import { BusinessCardStore } from './BusinessCardStore';
import { TaskStore } from './TaskStore';
import { AuthStore } from './AuthStore';

import { Services } from '../services';
import { IServices } from '../services/contracts';

class RootStore
{
    userStore: UserStore;
    businessStore: BusinessCardStore;
    taskStore: TaskStore;
    authStore: AuthStore

    service: IServices;

    constructor ()
    {
        this.service = new Services();

        this.businessStore = new BusinessCardStore(this.service);
        this.userStore = new UserStore(this.service);
        this.taskStore = new TaskStore(this.service);
        this.authStore = new AuthStore(this, this.service.authService);
    }
}

export default RootStore