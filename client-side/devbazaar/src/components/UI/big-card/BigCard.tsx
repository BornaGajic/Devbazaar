import { observer } from "mobx-react";

import './BigCard.css';

const BigCard = observer(() => {

    return (
        <div className="modal fade mt-3 h-100" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{zIndex: 99999}}>
            <div id="bigCard" className="modal-dialog modal-dialog-centered mb-0 mt-0">
                <div className="modal-content card h-100 shadow w-100 p-0">
                    <svg className="figure-img img-fluid card-img-top" width="512" height="256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 512x256" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <rect width="100%" height="100%" fill="#868e96"></rect>
                        <text x="43%" y="50%" fill="#dee2e6" dy=".3em">512x256</text>
                    </svg>
                    <div className="card-body">
                        <p className="card-title display-5 text-center">Card title</p>
                        <div className="card-text fs-5">
                            <p className="h5">Description</p>
                            <p>Some long description of what your business is all about</p>
                            <p className="h5">About</p>
                            <p>Somehing about your company</p>
                            <p>This is a longer card with supportinThis is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.g text below as a natural lead-in to additional content.</p>  
                        
                            <button className="btn btn-sm btn-outline-primary rounded-pill shadow-none disabeled">CategoryXY</button> <br/>
                            <button className="btn btn-sm btn-outline-secondary fw-bold shadow-none rounded-3 mt-3"> <i className="bi bi-heart me-2"></i>Add to favorites</button>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="card-text">
                            <small className="text-muted d-flex lead align-items-center">
                                <i className="bi bi-link-45deg">https://github.com/BornaGajic</i>
                            </small>
                            <small className="text-muted d-flex lead align-items-center">
                                <i className="bi bi-geo-alt">Hrvatska, 31000, Osijek</i>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default BigCard