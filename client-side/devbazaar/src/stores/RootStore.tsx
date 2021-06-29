import { UserStore } from './user-stores/UserStore'
import { BusinessCardPageStore } from './page-stores/BusinessCardPageStore';
import { TaskPageStore } from './page-stores/TaskPageStore';
import { AuthStore } from './auth-stores/AuthStore';
import { CategoryStore } from './CategoryStore';

import { Services } from '../services';
import { IServices } from '../services/contracts';
import { UiState } from './ui-store/UiState';
import { MyTaskPageStore } from './page-stores/MyTaskPageStore';
import { FavoriteBusinessesPageStore } from './page-stores/FavoriteBusinessesPageStore';
import { SearchStore } from './SearchStore';


class RootStore
{
    private service: IServices;

    userStore: UserStore;
    businessPageStore: BusinessCardPageStore;
    favoriteBusinessesPageStore: FavoriteBusinessesPageStore;
    taskPageStore: TaskPageStore;
    myTaskPageStore: MyTaskPageStore;
    categoryStore: CategoryStore;
    authStore: AuthStore;
    searchStore: SearchStore;

    UiState: UiState;

    constructor ()
    {
        this.UiState = new UiState(this);

        this.service = new Services();
        
        this.searchStore = new SearchStore(this);
        this.authStore = new AuthStore(this, this.service.authService);
        this.categoryStore = new CategoryStore(this, this.service);
        this.userStore = new UserStore(this, this.service);
        
        this.businessPageStore = new BusinessCardPageStore(this, this.service);

        this.myTaskPageStore = new MyTaskPageStore(this, this.service);
        this.taskPageStore = new TaskPageStore(this, this.service);

        this.favoriteBusinessesPageStore = new FavoriteBusinessesPageStore(this, this.service);
    }
}

export default RootStore