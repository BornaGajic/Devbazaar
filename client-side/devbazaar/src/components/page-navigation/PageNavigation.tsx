import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { SearchStore } from "../../stores/SearchStore";
import { UiState } from "../../stores/ui-store/UiState";

import './PageNavigation.css';

interface PageNavigationProps
{
    maxPages: number;
}

const PageNavigation = observer(({ maxPages }: PageNavigationProps) => {

    let location = useLocation();
    let query = useQuery();

    let setSearchParam = (pageNumber: number) => {
        query.set('pageNumber', pageNumber.toString());
    
        return query.toString();
    }

    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation" style={{marginLeft: "5%"}}>
            <ul id="pageNavigation" className=" pagination mt-5">
                <li className="page-item disabled" key="previous">
                    <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                </li>
                {
                    [...Array(maxPages).keys()].map(pageNumber => {
                        return (
                            <li className="page-item">
                                <NavLink to={{
                                    pathname: location.pathname,
                                    search: setSearchParam(pageNumber + 1)
                                }} className="page-link">
                                    {pageNumber + 1}
                                </NavLink>
                            </li>            
                        );
                    })
                }
                <li className="page-item" key="next">
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    );
});

export default PageNavigation;