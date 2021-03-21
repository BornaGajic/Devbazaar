import React from 'react'

const Header = ({}) => 
{
    return (
        <header className="container-fluid row navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow m-0">
            <div className="col col-2 d-flex">
                <a id="brand" className="navbar-brand justify-content-center p-0 shadow-none bg-dark col-md-3 col-lg-2 col-1">
                <i className="bi bi-code-slash"></i>
                    Devbazaar
                </a>
            </div>

          <div className="col col-8 col-md-4 dropdown d-flex">
          <input id="generalSearchBox" className="mx-3  form-control form-control-dark shadow-none me-2" type="text" placeholder="Search" aria-label="Search"/>
          <button id="dropdownBtn" className="btn btn-outline-success dropdown-toggle shadow-none my-auto mx-auto btn-sm d-md-block" data-bs-toggle="dropdown" aria-expanded="false" data-bs-target="#advancedSearch" aria-controls="advancedSearch" type="button">Advanced</button>

          <div id="advancedSearch" className="dropdown-menu w-100 bg-dark">

            {
              // mapiraj više inputa kao ovaj dolje u ovisnosti koji je user i na kojoj stranici se nalazi
            }

            <div className="list-group-item bg-dark border-none" aria-current="true">
              <div className="input-group d-flex w-100 justify-content-between">
                <div className="input-group-text"><i className="bi bi-person-fill fs-5 text-center"></i></div>
                <input id="usernameSearchBox" className="form-control form-control-dark  shadow-none" type="text" placeholder="Username" aria-label="Search"/>
              </div>
            </div>

          </div>
        </div>
        
        <div id="togglerAndSignout" className="col col-2 justify-content-end d-flex">
          <button id="signOutBtn" className="btn text-secondary mb-1 border-start shadow-none">Sign out</button> 
          <button className="navbar-toggler shadow-none d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>
        </div>
      </header>
    );
}

export default Header;