import { observer } from "mobx-react";
import { useState } from "react";
import BigCard from "../components/big-card/BigCard";
import CardList from "../components/card-list/CardList";
import PageNavigation from "../components/page-navigation/PageNavigation";
import { FavoriteBusinessesPageStore } from "../stores/page-stores/FavoriteBusinessesPageStore";
import { UiState } from "../stores/ui-store/UiState";

interface FavoriteBusinessesPageProps
{
    favoriteBusinessPageStore: FavoriteBusinessesPageStore;
    UiState: UiState;
}

export const FavoriteBusinessesPage = observer(({ favoriteBusinessPageStore, UiState }: FavoriteBusinessesPageProps) => {
    
    let [clickedCardId, setClickedCardId] = useState('');

    let maxPages = favoriteBusinessPageStore.businessCards_.size;

    return (
        <div>
            {
                favoriteBusinessPageStore.isLoading ? 
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
                            businessCardPageStore={ favoriteBusinessPageStore }
                            UiState={ UiState } 
                            setClickedCardId={(cardId: string) => setClickedCardId(cardId)}
                        />
                    
                        <BigCard 
                            businessCardPageStore={ favoriteBusinessPageStore }
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

export default FavoriteBusinessesPage;