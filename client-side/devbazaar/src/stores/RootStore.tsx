import { UserStore } from './UserStore'
import { BusinessCardPageStore } from './BusinessCardPageStore';
import { TaskPageStore } from './TaskPageStore';
import { AuthStore } from './AuthStore';
import { CategoryStore } from './CategoryStore';

import { Services } from '../services';
import { IServices } from '../services/contracts';


class RootStore
{
    private service: IServices;

    userStore: UserStore;
    businessStore: BusinessCardPageStore;
    taskStore: TaskPageStore;
    categoryStore: CategoryStore;
    authStore: AuthStore

    constructor ()
    {
        this.service = new Services();

        this.businessStore = new BusinessCardPageStore(this, this.service);
        this.userStore = new UserStore(this, this.service);
        this.taskStore = new TaskPageStore(this, this.service);
        this.categoryStore = new CategoryStore(this.service);
        this.authStore = new AuthStore(this, this.service.authService);
    }
}

export default RootStore