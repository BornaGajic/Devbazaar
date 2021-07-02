import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { useStores } from "../../hooks/useStores";

import Login from '../auth/Login';

import Main from "../main/Main";
import Sidebar from "../sidebar/SideBar";
import { TopBar } from "../top-bar";

const Body = observer(() => {

    let store = useStores();
        
    let firstPage = store.UiState.isLoggedIn ? (
        <div id="wrapper">
            <TopBar rootStore={store} />
            <Main rootStore={store} />
        </div>
    ) : <Login authStore={store.authStore} userStore={store.userStore} />;

    return (
        firstPage
    );
});

export default Body;