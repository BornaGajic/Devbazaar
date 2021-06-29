import { observer } from "mobx-react";
import { NavLink } from "react-router-dom";
import { UserRole } from "../../common";

import './SideBar.css';

const Sidebar = observer(({ role }: { role: string }) => {

    // Pretvoriti u Obeject s key path exact i search parametrima
    const navArray = role === UserRole.CLIENT ? ['Businesses', 'Tasks','My Tasks', 'Favorites'] : ['Home', 'Businesses', 'Tasks', 'Pinned Tasks'];
    const toArray = role === UserRole.CLIENT ? ['?pageNumber=1', '?pageNumber=1','?pageNumber=1', '?pageNumber=1'] : ['?pageNumber=1', '?pageNumber=1', '?pageNumber=1', '?pageNumber=1'];

    const navArrayIcons = role === UserRole.CLIENT ? 
    [
        'bi bi-house', 
        'bi bi-briefcase', 
        'bi bi-card-text',
        'bi bi-card-heading', 
        'bi bi-bookmark-heart'
    ] : 
    [
        'bi bi-house', 
        'bi bi-briefcase', 
        'bi bi-card-text', 
        'bi bi-pin'
    ];

    return (
        <div id="sidebarMenu" className="col-2 d-md-block sidebar collapse">
            <nav className="navbar navbar-light align-items-start">
                <div className="container-fluid d-flex flex-column p-0">
                    <NavLink to="/" className="navbar-brand d-flex justify-content-center sidebar-brand shadow-none m-0" id="brand">
                        <div className="sidebar-brand-icon">
                            <i className="bi bi-code-slash" />
                        </div>
                        <div className="sidebar-brand-text">
                            <span>Devbazaar</span>
                        </div>
                    </NavLink>

                    <hr className="border-2 border-top border-secondary w-75" />

                    <ul id="leftSidebar" className="navbar-nav">
                        {
                            navArray.map((item: string, idx: number) => {
                                return (
                                    <li className="nav-item fw-bold pb-3 pt-3 w-100">
                                        <NavLink 
                                            to={{
                                                pathname: '/' + item.replace(' ', ''),
                                                search: toArray[idx]
                                            }} className="nav-link" aria-current="page"
                                        >
                                            <i className={navArrayIcons[idx] + ' pe-1'} style={{verticalAlign: "text-bottom"}} />
                                            <span>{item}</span>
                                        </NavLink>    
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );

});  

export default Sidebar;