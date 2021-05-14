import { UserStore } from './user-stores/UserStore'
import { BusinessCardPageStore } from './page-stores/BusinessCardPageStore';
import { TaskPageStore } from './page-stores/TaskPageStore';
import { AuthStore } from './auth-stores/AuthStore';
import { CategoryStore } from './CategoryStore';

import { Services } from '../services';
import { IServices } from '../services/contracts';


class RootStore
{
    private service: IServices;

    userStore: UserStore;
    businessPageStore: BusinessCardPageStore;
    taskPageStore: TaskPageStore;
    categoryStore: CategoryStore;
    authStore: AuthStore

    constructor ()
    {
        this.service = new Services();

        this.authStore = new AuthStore(this, this.service.authService);
        this.categoryStore = new CategoryStore(this, this.service);
        this.userStore = new UserStore(this, this.service);
        
        this.businessPageStore = new BusinessCardPageStore(this, this.service);
        this.taskPageStore = new TaskPageStore(this, this.service);
    }
}

export default RootStore