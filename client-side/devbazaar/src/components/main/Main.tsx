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

const Main = observer(({ rootStore }: {rootStore: RootStore}) => {

	// <BrowseCardsPage  rootStore={rootStore} />
	// <BrowseTaskPage rootStore={rootStore}/>

	let loadingOrContent = rootStore.UiState.isLoadingPage ? 
	(
		<div className="d-flex justify-content-center min-vw-100">
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	) : 
	(
		<div>
			<div id="mainSection">
				<Switch>
					<Route exact path="/">
						<BrowseCardsPage rootStore={rootStore} />
					</Route>
					<Route exact path="/Home">
						<BrowseCardsPage rootStore={rootStore} />
					</Route>
					<Route exact path="/Businesses">
						<BrowseCardsPage rootStore={rootStore} />
					</Route>
					<Route exact path="/Tasks">
						<BrowseTaskPage rootStore={rootStore} />
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
							{ loadingOrContent }
						</main>
					</div>
						
					<Footer />
				</div>
			</div>
		</div>
    );
});

export default Main;