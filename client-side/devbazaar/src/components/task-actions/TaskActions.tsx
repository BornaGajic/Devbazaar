import { observer } from "mobx-react";
import { Link, useLocation } from "react-router-dom";

const TaskActions = observer(() => {
	let location = useLocation();
	
	return (
		<div className="position-absolute bottom-0 end-0" style={{marginBottom: "5%", marginRight: "5%"}}>
			<div className="btn-group dropup">
				<button type="button" className="btn btn-primary btn-circle btn-xl dropdown-toggle d-flex align-items-center justify-content-center" data-bs-toggle="dropdown" aria-expanded="false">
					<i className="bi bi-plus fs-1" style={{marginBottom: "50%"}}></i>
				</button> 
				<ul className="dropdown-menu animate__animated animate__fadeIn animate__faster" onClick={(e) => e.stopPropagation()}>
				<li className="dropdown-item">
					<Link to={location.pathname + '/NewTask'} style={{ color: 'inherit', textDecoration: 'inherit'}}>
						<i className="bi bi-clipboard-plus pe-2"></i>
						<span>New task</span>
					</Link>
				</li>
				<hr className="dropdown-divider"/>
				<li 
					className="dropdown-item">
					<Link to={location.pathname + '/RemoveTask'} style={{ color: 'inherit', textDecoration: 'inherit'}}>
						<i className="bi bi-clipboard-x pe-2"></i>
						<span>Remove task</span>
					</Link>
				</li>
				</ul>
			</div>
		</div>
	);
});

export default TaskActions;