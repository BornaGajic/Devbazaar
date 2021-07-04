import { observer } from "mobx-react";
import { Business, User } from "../../models";

interface CardProps
{
    businessCard: Business;
    setClickedCardId: (id: string) => void;
}

const Card = observer(({ businessCard, setClickedCardId }: CardProps) => {
    
    return (
        <button className="btn border-none p-0 m-0 shadow-none text-start h-100" onClick={(e) => setClickedCardId(businessCard.id ?? '')}  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="card h-100 shadow" style={{outline: "none"}}>
                {
                    businessCard.image ? 
                        <img src={businessCard.image} width="512" height="256" className="figure-img img-fluid card-img-top" />
                    :
                        <svg className="figure-img img-fluid card-img-top" width="512" height="256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 512x256" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <rect width="100%" height="100%" fill="#868e96"></rect>
                            <text x="43%" y="50%" fill="#dee2e6" dy=".3em">512x256</text>
                        </svg>
                }
                <div className="card-body">                        
                    <h5 className="card-title">
                        { businessCard.username }
                    </h5>
                    <p className="card-text">
                        { businessCard.description.slice(0, 220) }...
                    </p>
                </div>
                <div className="card-footer">
                    <p className="card-text">
                        <small className="text-muted d-flex justify-content-end">
                            <i className="bi bi-geo-alt pe-1" style={{verticalAlign: "text-bottom"}}></i>
                            <span>{ businessCard.country as string }, { businessCard.postalCode }, { businessCard.city as string }</span>
                        </small>
                    </p>
                </div>
            </div>
        </button>
    );
});

export default Card;