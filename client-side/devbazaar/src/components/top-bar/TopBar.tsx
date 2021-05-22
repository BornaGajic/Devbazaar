import { observer } from 'mobx-react';
import React from 'react'
import Searchbox from './search-box/SearchBox';
import UserDropdown from './user-dropdown/UserDropdown';

import './TopBar.css';

export const TopBar = observer(({}) => {
    
	return (
		<header className="container-fluid m-0 p-0">
			<nav className="row navbar navbar-light sticky-top flex-nowrap p-0 shadow m-0 justify-content-between">
			
				<div className="col-1">
					<button className="navbar-toggler d-md-none collapsed shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon top-bar"></span>
						<span className="navbar-toggler-icon middle-bar"></span>
						<span className="navbar-toggler-icon bottom-bar"></span>
					</button>
				</div>
					
				<Searchbox />

				<div className="col-2">
					<UserDropdown />
				</div>

			</nav>
		</header>
    );
});