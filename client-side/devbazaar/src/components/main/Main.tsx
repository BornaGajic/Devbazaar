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

const Main = observer(({ rootStore }: {rootStore: RootStore}) => {

	let [clickedCardId, setClickedCardId] = useState('');

	let loadingOrContent = rootStore.UiState.isLoadingPage ? (
		<div className="d-flex justify-content-center min-vw-100">
			<div className="spinner-border" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	) : (
		<div>
			<div id="mainSection">
				<CardList businessCardPageStore={ rootStore.businessPageStore }
						  UiState={ rootStore.UiState } 
						  setClickedCardId={(cardId: string) => setClickedCardId(cardId)}
				/>
				<BigCard businessCardPageStore={ rootStore.businessPageStore }
						 UiState={ rootStore.UiState } 
						 clickedCardId={clickedCardId}  
				/>
			</div>

			<div className="" style={{marginRight: "15%"}}>
				<PageNavigation UiState={rootStore.UiState} />
			</div>
		</div>
	);

    return (
		<div className="container-fluid d-flex flex-row"> 
			<div className="row"> 

				<Sidebar role={rootStore.userStore.user.role} />

				<div className="col m-0 p-0">
					<div className="row m-0 p-0">
						<main id="main" className="container-fluid min-vh-100 m-0 p-0">
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