import { observer } from "mobx-react";
import { Link, NavLink } from "react-router-dom";
import { UiState } from "../../stores/ui-store/UiState";

interface PageNavigationProps
{
    maxPages: number;
}

const PageNavigation = observer(({ maxPages }: PageNavigationProps) => {

    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation" style={{marginLeft: "5%"}}>
            <ul className=" pagination mt-5">
                <li className="page-item disabled" key="previous">
                    <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                </li>
                {
                    [...Array(maxPages).keys()].map(pageNumber => {
                        return (
                            <li className="page-item">
                                <NavLink to="/" className="page-link">
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