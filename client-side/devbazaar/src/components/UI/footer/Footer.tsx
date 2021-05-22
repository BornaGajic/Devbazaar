import { observer } from "mobx-react";

import './Footer.css';

const Footer = observer(() => {

    return (
        <div className="row-2">
              <footer className="bg-dark footer sticky-footer pb-0 mb-0 justify-content-center text-light">
                <div className="container my-auto">
                  <div className="row my-5 justify-content-center py-5">
                    <div className="col-11">
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-12 my-auto mx-auto a">
                                <h3 className="text-muted mb-md-0 mb-5 bold-text">Devbazaar.</h3>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h6 className="mb-3 mb-lg-4 bold-text "><b>Other</b></h6>
                                <ul className="list-unstyled">
                                    <li>About</li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-12">
                                <h6 className="mb-3 mb-lg-4 text-muted bold-text mt-sm-0 mt-5"><b>Socials</b></h6>
                                <ul className="list-group list-group-flush bg-dark">
                                  <li className="list-group-item list-group-item-dark p-0 py-1"><i className="bi bi-facebook me-1"></i>Facebook</li>
                                  <li className="list-group-item list-group-item-dark p-0 py-1"><i className="bi bi-linkedin me-1"></i>Linkedin</li>
                                  <li className="list-group-item list-group-item-dark p-0 py-1"><i className="bi bi-github me-1"></i>Github</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-xl-8 col-md-4 col-sm-4 col-auto my-md-0 mt-5 order-sm-1 order-3 align-self-end">
                                <p className="social text-muted mb-0 pb-0 bold-text"></p><small className="rights"><span>&#174;</span> Devbazaar All Rights Reserved.</small>
                            </div>
                            <div className="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                                <h6 className="mt-55 mt-2 text-muted bold-text"><b>Borna Gajić</b></h6><small>borna.gajic@gmail.com</small>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
            </footer>
        </div>
    );
});

export default Footer;