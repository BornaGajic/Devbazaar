import { observer } from "mobx-react";
import React, { useState } from "react";
import BigCard from "../big-card/BigCard";

import CardList from "../card-list/CardList";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/SideBar";

import './Main.css';
import PageNavigation from "../page-navigation/PageNavigation";
import { RootStore } from "../../stores";
import { Business } from "../../models";
import BrowseCardsPage from "../../pages/BrowseCardsPage";
import BrowseTaskPage from "../../pages/BrowseTaskPage";
import { Route, Switch } from "react-router";
import MyTaskPage from "../../pages/MyTaskPage";

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
						<BrowseCardsPage businessPageStore={rootStore.businessPageStore} UiState={rootStore.UiState} />
					</Route>
					<Route exact path="/Home">
						<BrowseCardsPage businessPageStore={rootStore.businessPageStore} UiState={rootStore.UiState} />
					</Route>
					<Route exact path="/Businesses">
						<BrowseCardsPage businessPageStore={rootStore.businessPageStore} UiState={rootStore.UiState} />
					</Route>
					<Route exact path="/Tasks">
						<BrowseTaskPage taskPageStore={rootStore.taskPageStore} />
					</Route>
					<Route exact path="/MyTasks">
						<MyTaskPage myTaskPageStore={rootStore.myTaskPageStore}/>
					</Route>
				</Switch>
			</div>
		</div>
	);

    return (
		<div className="container-fluid"> 
			<div className="row"> 

				<Sidebar role={rootStore.userStore.user.role} />

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