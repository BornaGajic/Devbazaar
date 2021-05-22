import { observer } from "mobx-react";


const Card = observer(() => {
    
    return (
        <button className="btn border-none p-0 m-0 shadow-none text-start" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div className="card h-100 shadow" style={{outline: "none"}}>
                <svg className="figure-img img-fluid card-img-top" width="512" height="256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 512x256" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="43%" y="50%" fill="#dee2e6" dy=".3em">512x256</text>
                </svg>
                <div className="card-body">                        
                    <h5 className="card-title">
                        Card title
                    </h5>
                    <p className="card-text">
                        This is a longer card with supportinThis is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.g text below as a natural lead-in to additional content.
                    </p>
                </div>
                <div className="card-footer">
                    <p className="card-text">
                        <small className="text-muted d-flex justify-content-end">
                            <i className="bi bi-geo-alt pe-1"></i>
                            <span>Hrvatska, 31000, Osijek</span>
                        </small>
                    </p>
                </div>
            </div>
        </button>
    );
});

export default Card;