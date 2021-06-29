import { runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useQuery } from "../../../hooks/useQuery";
import { SearchStore } from "../../../stores/SearchStore";

import './SearchBox.css';

const Searchbox = observer(({ searchStore }: { searchStore: SearchStore }) => {

    let [typing, setTyping] = useState('');

    let handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        runInAction(() => searchStore.query = typing);
        console.log(searchStore.query);
    };

    let handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        runInAction(() =>  setTyping('?username=' + e.target.value));
    }

    return (
        <form onSubmit={handleSubmit} id="searchBox" className="col col-md-5 dropdown d-flex ms-3 me-3">
            <input onChange={handleChange} className="mx-3 bg-dark form-control form-control-dark shadow-none me-2 ms-5" type="text" placeholder="Search pinned tasks" aria-label="Search" />
            <button id="dropdownBtn" className="btn btn-outline-success dropdown-toggle shadow-none my-auto mx-auto btn-sm" data-bs-toggle="dropdown" aria-expanded="false" data-bs-target="#advancedSearch" aria-controls="advancedSearch" type="button"><i className="bi bi-filter fs-6"></i></button>
            
            <div id="advancedSearch" className="dropdown-menu bg-dark w-100 animate__animated animate__fadeIn animate__faster">
                <ul className="list-group list-group-flush">
                    <div className="list-group-item bg-dark border-none" aria-current="true">
                        <div className="input-group d-flex w-100 justify-content-between">
                            <div className="input-group-text"><i className="bi bi-person-fill fs-5 text-center"></i></div>
                            <input className="form-control form-control-dark shadow-none" type="text" placeholder="Username" aria-label="Search" />
                        </div>
                    </div>
                    <div className="list-group-item bg-dark">
                        <div className="input-group d-flex w-100 justify-content-between bg-dark">
                            <div className="input-group-text"><i className="bi bi-geo-fill"></i></div>
                            <input className="form-control form-control-dark  shadow-none" type="text" placeholder="Country" aria-label="Search" />
                        </div>
                    </div>
                    <div className="list-group-item bg-dark">
                        <div className="input-group d-flex w-100 justify-content-between bg-dark">
                            <div className="input-group-text"><i className="bi bi-geo-fill"></i></div>
                            <input className="form-control form-control-dark  shadow-none" type="text" placeholder="City" aria-label="Search" />
                        </div>
                    </div>

                    <div className="list-group-item bg-dark" style={{color: "white"}}>
                        <div className="form-check form-switch">
                            <label htmlFor="ascUsernameCheckbox" className="fs-6 ms-3 mt-1">Username <i className="bi bi-sort-alpha-down"></i></label>
                            <input className="form-check-input" type="checkbox" id="ascUsernameCheckbox" style={{height: "25px", width: "50px"}}/>
                        </div>
                    </div>
                    
                    <div className="list-group-item bg-dark">
                        <div className="d-flex w-100 justify-content-center bg-dark">
                            <button className="btn btn-outline-primary btn-lg btn-sm d-md-block" style={{fontSize: "medium"}}>
                                <i className="bi-search" style={{fontSize: "medium"}}></i>
                                <span>Search</span>
                            </button>
                        </div>
                    </div>
                </ul>
            </div>
        </form>
    );
});

export default Searchbox;