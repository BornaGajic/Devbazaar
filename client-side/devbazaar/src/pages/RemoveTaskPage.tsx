import { observer } from "mobx-react";

const RemoveTaskPage = observer(() => {

    return (
        <div className="row">
            <div className="col-lg-8 col-sm-10 col-10 mt-5" style={{marginLeft: "10%"}}>
                <div className="card shadow">
                    <div className="card-header">
                        <p className="text-primary fw-bold text-center my-1 fs-3">Tasks</p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col text-center">
                                <label className="form-label">
                                    <input type="search" className="form-control form-control-sm" placeholder="Search task" />
                                </label>
                            </div>
                        </div>
                        <div className="row align-self-center">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex">
                                    <div className="col text-start align-self-center">
                                        <span>A first item</span>
                                    </div>
                                    <div className="d-none d-sm-block col align-self-center">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                    <div className="col text-end align-self-center">
                                        <button className="btn shadow-none">
                                            <i className="bi bi-x fs-4 text-danger"></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex">
                                    <div className="col text-start align-self-center">
                                        <span>A first item</span>
                                    </div>
                                    <div className="col d-none d-sm-block align-self-center">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                    <div className="col text-end align-self-center">
                                        <button className="btn shadow-none">
                                            <i className="bi bi-x fs-4 text-danger"></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex">
                                    <div className="col text-start align-self-center">
                                        <span>A first item</span>
                                    </div>
                                    <div className="col d-none d-sm-block align-self-center">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                    <div className="col text-end align-self-center">
                                        <button className="btn shadow-none">
                                            <i className="bi bi-x fs-4 text-danger"></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex">
                                    <div className="col text-start align-self-center">
                                        <span>A first item</span>
                                    </div>
                                    <div className="col d-none d-sm-block align-self-center">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </div>
                                    <div className="col text-end align-self-center">
                                        <button className="btn shadow-none">
                                            <i className="bi bi-x fs-4 text-danger"></i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            <hr className="border-2 border-top border-secondary"/>
                            <div className="row mt-2">
                                <div className="col text-start">
                                    <button className="btn btn-success">
                                        Save changes
                                    </button>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col text-end">
                                    <button className="btn btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default RemoveTaskPage;