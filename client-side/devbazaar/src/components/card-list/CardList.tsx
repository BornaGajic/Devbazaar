import { toJS } from "mobx";
import { observer } from "mobx-react";
import { Business } from "../../models";
import { BusinessCardPageStore } from "../../stores/page-stores";
import { FavoriteBusinessesPageStore } from "../../stores/page-stores/FavoriteBusinessesPageStore";

import Card from "../card/Card";

interface CardListProps
{
    businessCardPageStore: BusinessCardPageStore | FavoriteBusinessesPageStore;

    cardsPageNumber: number;

    setClickedCardId: (id: string) => void;
}

const CardList = observer(({ businessCardPageStore, setClickedCardId, cardsPageNumber }: CardListProps) => {

    let businessCards = businessCardPageStore?.businessCards_.get(cardsPageNumber) ?? [];

    return (
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4 m-3">
            {
                businessCards.map(businessCard => 
                    <div className="col d-sm-flex justify-content-sm-center">
                        <Card businessCard={businessCard} setClickedCardId={setClickedCardId} />
                    </div>    
                )
            }
        </div>
    );
});

export default CardList;