import { observer } from "mobx-react";
import React, { useState } from "react";
import BigCard from "../components/big-card/BigCard";
import CardList from "../components/card-list/CardList";
import PageNavigation from "../components/page-navigation/PageNavigation";
import { RootStore } from "../stores";
import { BusinessCardPageStore } from "../stores/page-stores";
import { UiState } from "../stores/ui-store/UiState";

interface BrowseCardsPageProps
{
    businessPageStore: BusinessCardPageStore;
    UiState: UiState;
}

const BrowseCardsPage = observer(({ businessPageStore, UiState } : BrowseCardsPageProps) => {

    let [clickedCardId, setClickedCardId] = useState('');

    let maxPages = businessPageStore.businessCards_.size;
    
    return (
        <div>
            {
                businessPageStore.isLoading ? 
                (
                    <div className="d-flex justify-content-center min-vw-100">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
		            </div>
                ) : 
                (
                    <div id="browseCardsPage">
                        <CardList 
                            businessCardPageStore={ businessPageStore }
                            UiState={ UiState } 
                            setClickedCardId={(cardId: string) => setClickedCardId(cardId)}
                        />
                    
                        <BigCard 
                            businessCardPageStore={ businessPageStore }
                            UiState={ UiState } 
                            clickedCardId={clickedCardId}  
                        />
            
                        <div className="" style={{marginRight: "5%"}}>
                            <PageNavigation maxPages={maxPages} />
                        </div>
                    </div>
                )
            }
        </div>
    );
});

export default BrowseCardsPage;