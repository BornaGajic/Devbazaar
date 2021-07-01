import { observer } from "mobx-react";

import Footer from "../footer/Footer";
import Sidebar from "../sidebar/SideBar";

import './Main.css';

import { RootStore } from "../../stores";

import BrowseCardsPage from "../../pages/BrowseCardsPage";
import BrowseTaskPage from "../../pages/BrowseTaskPage";
import { Route, Switch } from "react-router";
import MyTaskPage from "../../pages/MyTaskPage";
import FavoriteBusinessesPage from "../../pages/FavoriteBusinessesPage";
import NewTaskPage from "../../pages/NewTaskPage";
import RemoveTaskPage from "../../pages/RemoveTaskPage";
import UpdateUserPage from "../../pages/UpdateUserPage";
import UpdateTaskPage from "../../pages/UpdateTaskPage";

const Main = observer(({ rootStore }: {rootStore: RootStore}) => {

	// this can be probably be switched with the new Suspense component from React 18.0
	// TODO: Check the Suspense component, React 18.0
	// @see link: https://reactjs.org/docs/react-api.html#reactsuspense
	let content = 
	(
		<div>
			<div id="mainSection">
				<Switch>
					<Route exact path="/">	
						<BrowseCardsPage businessPageStore={rootStore.businessPageStore} />
					</Route>
					<Route path="/UpdateUser">
						<UpdateUserPage userStore={rootStore.userStore}/>
					</Route>
					<Route path="/Businesses">
						<BrowseCardsPage businessPageStore={rootStore.businessPageStore} />
					</Route>
					<Route path="/Tasks">
						<BrowseTaskPage taskPageStore={rootStore.taskPageStore} />
					</Route>
					<Route path="/MyTasks/NewTask">
						<NewTaskPage />
					</Route>
					<Route path="/MyTasks/RemoveTask">
						<RemoveTaskPage myTaskPageStore={rootStore.myTaskPageStore}/>
					</Route>
					<Route path="/MyTasks/UpdateTask/:taskId">
						<UpdateTaskPage />
					</Route>
					<Route path="/MyTasks">
						<MyTaskPage myTaskPageStore={rootStore.myTaskPageStore}/>
					</Route>
					<Route path="/Favorites">
						<FavoriteBusinessesPage favoriteBusinessPageStore={rootStore.favoriteBusinessesPageStore} searchStore={rootStore.searchStore}/>
					</Route>
				</Switch>
			</div>
		</div>
	);

    return (
		<div className="container-fluid"> 
			<div className="row"> 

				<Sidebar role={rootStore.userStore.user.role} searchStore={rootStore.searchStore} />

				<div className="col m-0 p-0">
					<div className="row m-0 p-0">
						<main id="main" className="min-vh-100 m-0 p-0">
							{ content }
						</main>
					</div>
						
					<Footer />
				</div>
			</div>
		</div>
    );
});

export default Main;