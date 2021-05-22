import { observer } from "mobx-react";

const UserDropdown = observer(() => {

    return (
        <ul className="navbar-nav flex-nowrap ms-auto p-2 h-100">
            <li className="nav-item dropdown">
                <div className="nav-item dropdown">
                    <a className="dropdown-toggle nav-link p-0 m-0" aria-expanded="false" data-bs-toggle="dropdown" href="#">
                        <span className="d-none d-lg-inline me-2 text-gray-600 small fw-bold">Borna Gajić</span>
                        <svg className="" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: avatar" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <circle cx="16" cy="16" r="16" fill="#868e96"></circle>
                        </svg>
                    </a>
                    <ul id="moreinfo" className="position-absolute dropdown-menu dropdown-menu-end dropdown-menu-lg-start mt-3 shadow animate__animated animate__fadeIn animate__faster">
                        <li>
                            <a className="dropdown-item" href="#"><i className="bi bi-person me-2 text-gray-400"></i> Profile</a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#"><i className="bi bi-gear me-2 text-gray-400"></i> Settings</a>
                        </li>
                        <hr className="dropdown-divider"/>
                        <li>
                            <a className="dropdown-item" href="#"><i className="bi bi-box-arrow-in-left me-2 text-gray-400"></i> Logout</a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    );
});

export default UserDropdown;