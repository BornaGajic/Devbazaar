import { UserStore } from './UserStore'
import { BusinessStore } from './BusinessStore';

class RootStore
{
    UserStore: UserStore;
    BusinessStore: BusinessStore;

    constructor ()
    {
        this.UserStore = new UserStore(this);
        this.BusinessStore = new BusinessStore(this);
    }
}

export default RootStore