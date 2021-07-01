import { observer } from "mobx-react";

const UpdateUserPage = observer(() => {

    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-center mt-4">
                        <h1 className="display-4" >Edit profile</h1>
                    </div>
                </div>
                <div className="col">
                    <div className="d-flex justify-content-center mt-5">
                        <button className="btn btn-primary">
                            Preview changes
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="row justify-content-start mt-5">
                <div className="col-lg-4">
                    <div className="card mb-3">
                        <div className="card-body text-center shadow">
                            <svg className="rounded-circle mb-3 mt-4" width="160" height="160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: avatar" preserveAspectRatio="xMidYMid slice" focusable="false">
                                <circle cx="80" cy="80" r="80" fill="#868e96"></circle>
                            </svg>
                            <div className="my-3">
                                <button className="btn btn-primary btn-sm">
                                    Change photo
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">User settings</p>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted" htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username" placeholder="Username"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3">
                                        <label className="form-label fw-bold text-muted" htmlFor="email">Email Adress</label>
                                        <input type="text" className="form-control" id="email" placeholder="user@example.com"/>
                                    </div>
                                </div>
                                <div className="mb-3 text-center mb-0">
                                    <button className="btn btn-sm btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Categories</p>
                        </div>
                        <div className="card-body">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <i className="bi bi-x text-danger"></i>
                                    <span className="badge rounded-pill bg-primary">Managed IT Service</span>
                                </li>
                                <li className="list-inline-item">
                                    <i className="bi bi-x text-danger"></i>
                                    <span className="badge rounded-pill bg-primary">Cloud Computing</span>
                                </li>
                            </ul>
                            <select className="form-select shadow-none">
                                <option value="0">Managed IT Service</option>
                                <option value="1">On Demand IT</option>
                                <option value="2">Cloud Computing</option>
                            </select>
                            <div className="mt-3 text-center">
                                <button className="btn btn-primary btn-sm">
                                    Add category
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 ms-md-3">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Settings</p>
                        </div>
                        <div className="card-body mx-3">
                            <form>
                                <div className="row mb-4">
                                    <label className="form-label text-secondary fw-bold text-muted p-0" htmlFor="about">About</label>
                                    <textarea className="form-control" id="about"></textarea>
                                </div>
                                <div className="row mb-4">
                                    <label htmlFor="webpage" className="form-label text-secondary fw-bold text-muted p-0">Webpage</label>
                                    <input type="text" className="form-control" id="webpage" placeholder="something.com/else"/>
                                </div>
                                <div className="mb-3 text-center mb-0">
                                    <button className="btn btn-sm btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Settings</p>
                        </div>
                        <div className="card-body mx-3">
                            <form>
                                <div className="row mb-4">
                                    <label className="form-label text-secondary fw-bold text-muted p-0" htmlFor="about">About</label>
                                    <textarea className="form-control" id="about"></textarea>
                                </div>
                                <div className="row mb-4">
                                    <label className="form-label text-secondary fw-bold text-muted p-0" htmlFor="description">Description</label>
                                    <textarea className="form-control" id="description"></textarea>
                                </div>
                                <div className="row mb-4">
                                    <label htmlFor="website" className="form-label text-secondary fw-bold text-muted p-0">Website</label>
                                    <input type="text" className="form-control" id="website" placeholder="something.com/else"/>
                                </div>
                                <div className="form-check form-switch mb-4">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
                                    <label className="form-check-label text-secondary fw-bold text-muted" htmlFor="flexSwitchCheckChecked">Available</label>
                                </div>
                                <div className="mb-3 text-center mb-0">
                                    <button className="btn btn-sm btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Contact settings</p>
                        </div>
                        <div className="card-body mx-3">
                            <form>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label htmlFor="country" className="form-label text-secondary fw-bold text-muted p-0">Country</label>
                                        <input type="text" placeholder="e.g. Croatia" className="form-control" id="country"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="city" className="form-label text-secondary fw-bold text-muted p-0">City</label>
                                        <input type="text" placeholder="e.g. Zagreb" className="form-control" id="city"/>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-6">
                                        <label htmlFor="postalcode" className="form-label text-secondary fw-bold text-muted p-0">Postal code</label>
                                        <input type="number" placeholder="e.g. 10000" className="form-control" id="postalcode"/>
                                    </div>
                                </div>
                                <div className="mb-3 text-center mb-0">
                                    <button className="btn btn-sm btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default UpdateUserPage;