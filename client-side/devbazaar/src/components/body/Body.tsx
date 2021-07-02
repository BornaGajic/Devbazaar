import { observer } from "mobx-react";
import { Route, Switch, useHistory } from "react-router";
import { PrivateRoute } from "../../hoc";
import { useStores } from "../../hooks/useStores";

import Login from '../auth/Login';

import Main from "../main/Main";
import Sidebar from "../sidebar/SideBar";
import { TopBar } from "../top-bar";

const Body = observer(() => {

    // PRIVATE ROUTE NAPRAVITI!!

    let store = useStores();

    let loginComponent = <Login authStore={store.authStore} userStore={store.userStore} />;

    let firstPage = store.UiState.isLoggedIn ? (
        <div id="wrapper">
            <TopBar rootStore={store} />
            <Main rootStore={store} />
        </div>
    ) : <Login authStore={store.authStore} userStore={store.userStore} />;

    return (
        <Switch>
            <Route path="/Login">
                <Login authStore={store.authStore} userStore={store.userStore} />
            </Route>
            <PrivateRoute path="/" exact={false}>
                <div id="wrapper">
                    <TopBar rootStore={store} />
                    <Main rootStore={store} />
                </div>
            </PrivateRoute>
        </Switch>
    );
});

export default Body;