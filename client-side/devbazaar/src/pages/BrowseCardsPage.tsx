import { observer } from "mobx-react";
import React, { useState } from "react";
import BigCard from "../components/big-card/BigCard";
import CardList from "../components/card-list/CardList";
import PageNavigation from "../components/page-navigation/PageNavigation";
import { RootStore } from "../stores";

const BrowseCardsPage = observer(({ rootStore } : { rootStore: RootStore }) => {

    let [clickedCardId, setClickedCardId] = useState('');

    let maxPages = rootStore.businessPageStore.businessCards_.size;

    return (
        <div id="browseCardsPage">
            <CardList 
                businessCardPageStore={ rootStore.businessPageStore }
                UiState={ rootStore.UiState } 
                setClickedCardId={(cardId: string) => setClickedCardId(cardId)}
            />
        
            <BigCard 
                businessCardPageStore={ rootStore.businessPageStore }
                UiState={ rootStore.UiState } 
                clickedCardId={clickedCardId}  
            />

            <div className="" style={{marginRight: "5%"}}>
				<PageNavigation maxPages={maxPages} />
			</div>
        </div>
    );
});

export default BrowseCardsPage;