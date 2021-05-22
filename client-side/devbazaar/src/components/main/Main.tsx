import { observer } from "mobx-react";
import React from "react";
import BigCard from "./big-card/BigCard";

import CardList from "./card-list/CardList";
import Footer from "./footer/Footer";
import Sidebar from "./sidebar/SideBar";

import './Main.css';

const Main = observer(() => {


    return (
		<div className="container-fluid d-flex flex-row"> 
			<div className="row"> 

				<Sidebar />

				<div className="col m-0 p-0">
					<div className="row m-0 p-0">
						<main id="main" className="container-fluid min-vh-100 m-0 p-0">

							<div>
								<CardList />
							</div>
							
							<BigCard />
				
							<div className="" style={{marginRight: "15%"}}>
								<nav className="d-flex justify-content-center" aria-label="Page navigation" style={{marginLeft: "5%"}}>
								<ul className=" pagination mt-5">
									<li className="page-item disabled">
									<a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
									</li>
									<li className="page-item"><a className="page-link" href="#">1</a></li>
									<li className="page-item"><a className="page-link" href="#">2</a></li>
									<li className="page-item"><a className="page-link" href="#">3</a></li>
									<li className="page-item">
									<a className="page-link" href="#">Next</a>
									</li>
								</ul>
								</nav>
							</div>
			
						</main>
					</div>
						
					<Footer />
				</div>
			</div>
		</div>
    );
});

export default Main;