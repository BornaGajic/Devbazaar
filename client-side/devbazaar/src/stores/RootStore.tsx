import { UserStore } from './UserStore'

class RootStore
{
    UserStore: UserStore;

    constructor ()
    {
        this.UserStore = new UserStore(this);
    }
}

export default RootStore