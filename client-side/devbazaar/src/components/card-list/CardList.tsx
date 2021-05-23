import { toJS } from "mobx";
import { observer } from "mobx-react";
import { Business } from "../../models";
import { BusinessCardPageStore } from "../../stores/page-stores";
import { UiState } from "../../stores/ui-store/UiState";
import Card from "../card/Card";

interface CardListProps
{
    businessCardPageStore: BusinessCardPageStore;
    UiState: UiState;

    setClickedCardId: (id: string) => void;
}

const CardList = observer(({ businessCardPageStore, UiState, setClickedCardId }: CardListProps) => {

    let businessCards = businessCardPageStore?.businessCards_.get(UiState.currentPage) as Business[];

    return (
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4 m-3">
            {
                [...Array(UiState.itemsPerPage).keys()].map(idx =>
                    <div className="col d-sm-flex justify-content-sm-center">
                        <Card businessCard={ businessCards[idx] } setClickedCardId={setClickedCardId} />
                    </div>
                )
            }
        </div>
    );
});

export default CardList;