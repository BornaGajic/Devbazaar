import { useStores } from "./useStores"

export const useRole = () => {
    let store = useStores();

    return store.userStore.user.role;
}