import { observer } from "mobx-react";

import './SideBar.css';

const Sidebar = observer(() => {

    return (
        <div id="sidebarMenu" className="col-2 d-md-block sidebar collapse">
            <nav className="navbar navbar-light align-items-start">
                <div className="container-fluid d-flex flex-column p-0">
    
                    <a id="brand" className="navbar-brand d-flex justify-content-center sidebar-brand shadow-none m-0">
                        <div className="sidebar-brand-icon">
                            <i className="bi bi-code-slash" />
                        </div>
                        <div className="sidebar-brand-text">
                            <span>Devbazaar</span>
                        </div>
                    </a>

                    <hr className="border-2 border-top border-secondary w-75" />
                    <ul id="leftSidebar" className="navbar-nav">
                        <li className="nav-item fw-bold pb-3 pt-3 w-100">
                            <a className="nav-link" aria-current="page" href="#">
                                <i className="bi bi-house pe-1" />
                                <span>Home</span>
                            </a>
                        </li>
                        <li className="nav-item fw-bold pb-3 pt-3 w-100">
                            <a className="nav-link active" aria-current="page" href="#">
                                <i className="bi bi-card-text pe-1" />
                                <span>Browse</span>
                            </a>
                        </li>
                        <li className="nav-item fw-bold pb-3 pt-3 w-100">
                            <a className="nav-link" aria-current="page" href="#">
                                <i className="bi bi-card-text pe-1" />
                                <span>Tasks</span>
                            </a>
                        </li>
                        <li className="nav-item fw-bold pb-3 pt-3 w-100">
                            <a className="nav-link" href="#">
                                <i className="bi bi-files-alt pe-1" />
                                <span>Pinned tasks</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );

});  

export default Sidebar;