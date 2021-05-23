import { observer } from "mobx-react";
import { UiState } from "../../stores/ui-store/UiState";

const PageNavigation = observer(({ UiState }: { UiState: UiState }) => {

    return (
        <nav className="d-flex justify-content-center" aria-label="Page navigation" style={{marginLeft: "5%"}}>
            <ul className=" pagination mt-5">
                <li className="page-item disabled" key="previous">
                    <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                </li>
                {
                    [...Array(UiState.maxBusinessCardPages).keys()].map(pageNumber => {
                        return (
                            <li className="page-item"><a className="page-link" href="#">{pageNumber + 1}</a></li>            
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