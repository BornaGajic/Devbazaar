import { observer } from "mobx-react";
import { useState } from "react";
import BrowseCardsPage from "../../pages/BrowseCardsPage";
import { BusinessCardPageStore } from "../../stores/page-stores";
import { FavoriteBusinessesPageStore } from "../../stores/page-stores/FavoriteBusinessesPageStore";

import './BigCard.css';

interface BigCardProps
{
    businessCardPageStore: BusinessCardPageStore | FavoriteBusinessesPageStore;

    cardsPageNumber: number;

    clickedCardId?: string;
}


const BigCard = observer((bigCardProps: BigCardProps) => {
    let favBStore = bigCardProps.businessCardPageStore.rootStore.userStore.clientStore.favouriteBusinessStore;

    let card = bigCardProps.businessCardPageStore.businessCards_.get(bigCardProps.cardsPageNumber)?.find(c => c.id === bigCardProps.clickedCardId);
    
    console.log(card);

    let addToFvrtBtn = card?.isFavourited ? 
    (
        <button 
            className="btn btn-sm btn-primary fw-bold shadow-none rounded-3 mt-2 mb-2" 
            onClick={() => {
                let myModal = document.getElementById("exampleModal");
                
                let completeChanges = favBStore.removeFromFavourites(card!);

                myModal?.addEventListener('hidden.bs.modal', async () => {
                    if (card?.isFavourited === false)
                    {
                        (await completeChanges)();
                    }
                }, {
                    once: true
                });
            }}
        > 
            <i className="bi bi-heart-fill me-2" style={{color: "white", verticalAlign: "text-bottom"}}></i>
            In Favorites
        </button>
    ) :
    (
        <button 
            className="btn btn-sm btn-outline-secondary fw-bold shadow-none rounded-3 mt-3 mb-3" 
            onClick={() => favBStore.addToFavourites(card!)}
        >  
            <i className="bi bi-heart me-2" style={{verticalAlign: "text-bottom"}}></i>
            Add to Favorites
        </button>
    );
    
    return (
        <div className="modal fade mt-3 h-100" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{zIndex: 99999}}>
            <div id="bigCard" className="modal-dialog modal-dialog-centered mb-0 mt-0">
                <div className="modal-content card h-100 shadow w-100 p-0 mb-5">
                    <svg className="figure-img img-fluid card-img-top" width="512" height="256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 512x256" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <rect width="100%" height="100%" fill="#868e96"></rect>
                        <text x="43%" y="50%" fill="#dee2e6" dy=".3em">512x256</text>
                    </svg>
                    <div className="card-body">
                        <p className="card-title display-5 text-center">{ card?.username }</p>
                        <div className="card-text fs-5">
                            <p className="h5">Description</p>
                            <p>{card?.description}</p>
                            <p className="h5">About</p>
                            <p>{ card?.about }</p>  
                            
                            <ul className="list-inline">
                                {
                                    card?.categories.map(category =>
                                        <li key={category.id} className="list-inline-item">
                                            <button className="btn btn-sm btn-outline-primary rounded-pill shadow-none disabeled">
                                                <span>{category.name}</span>
                                            </button>
                                        </li>                                        
                                    )
                                }
                            </ul>  

                            <div className="d-flex justify-content-center">
                                { addToFvrtBtn }
                            </div>              
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="card-text">
                            <small className="text-muted d-flex lead align-items-center">
                                <i className="bi bi-link-45deg" style={{verticalAlign: "text-bottom"}}>{ card?.website }</i>
                            </small>
                            <small className="text-muted d-flex lead align-items-center">
                                <i className="bi bi-geo-alt" style={{verticalAlign: "text-bottom"}}>{ card?.country }, { card?.postalCode }, { card?.city }</i>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default BigCard