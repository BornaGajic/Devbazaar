import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useState } from "react";
import BigCard from "../components/big-card/BigCard";
import CardList from "../components/card-list/CardList";
import PageNavigation from "../components/page-navigation/PageNavigation";
import { useQuery } from "../hooks/useQuery";
import { FavoriteBusinessesPageStore } from "../stores/page-stores/FavoriteBusinessesPageStore";
import { SearchStore } from "../stores/SearchStore";
import { UiState } from "../stores/ui-store/UiState";

interface FavoriteBusinessesPageProps
{
    favoriteBusinessPageStore: FavoriteBusinessesPageStore;
    searchStore: SearchStore;
}

export const FavoriteBusinessesPage = observer(({ favoriteBusinessPageStore, searchStore }: FavoriteBusinessesPageProps) => {
    
    let [clickedCardId, setClickedCardId] = useState('');
    let query = useQuery();

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
                            cardsPageNumber={Number.parseInt(query.get("pageNumber") ?? '1')}
                            setClickedCardId={(cardId: string) => setClickedCardId(cardId)}
                        />
                    
                        <BigCard 
                            businessCardPageStore={ favoriteBusinessPageStore }
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

export default FavoriteBusinessesPage;