import { observer } from "mobx-react";
import React, { useState } from "react";
import BigCard from "../components/big-card/BigCard";
import CardList from "../components/card-list/CardList";
import PageNavigation from "../components/page-navigation/PageNavigation";
import { useQuery } from "../hooks/useQuery";
import { BusinessCardPageStore } from "../stores/page-stores";

interface BrowseCardsPageProps
{
    businessPageStore: BusinessCardPageStore;
}

const BrowseCardsPage = observer(({ businessPageStore } : BrowseCardsPageProps) => {

    let [clickedCardId, setClickedCardId] = useState('');

    let query = useQuery();

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
                            businessCardPageStore={businessPageStore}
                            cardsPageNumber={Number.parseInt(query.get("pageNumber") ?? '1')}
                            setClickedCardId={(cardId: string) => setClickedCardId(cardId)}
                        />
                    
                        <BigCard 
                            businessCardPageStore={businessPageStore}
                            cardsPageNumber={Number.parseInt(query.get("pageNumber") ?? '1')}
                            clickedCardId={clickedCardId}  
                        />
            
                        <div className="" style={{marginRight: "5%"}}>
                            <PageNavigation 
                                maxPages={maxPages} 
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
});

export default BrowseCardsPage;