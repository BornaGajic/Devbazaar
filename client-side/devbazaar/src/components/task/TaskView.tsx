import { observer } from "mobx-react";
import React, { useState } from "react";
import { Task } from "../../models";
import { RootStore } from "../../stores";


const TaskView = observer(({ task } : { task: Task }) => {

    return (
        <div>
            <div className="card">
                <div className="card-header py-3 px-4" id={"heading" + task.id}>
                    <h2 className="mb-0">
                        <button className="d-flex align-items-center justify-content-between btn" data-bs-toggle="collapse" data-bs-target={"#" + task.id} aria-expanded="false" aria-controls={"collapse" + task.id}>
                            <div className="row w-100">
                            <div className="col text-start">
                                <svg className="" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: avatar" preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <circle cx="16" cy="16" r="16" fill="#868e96"></circle>
                                </svg>
                                <span className="fs-6 ps-3">{ task?.username }</span>
                            </div>
                            <div className="col text-center">
                                <span>{ task.title ?? "Title" }</span>
                            </div>
                            <div className="col text-end">
                                <span className="me-3"><i className="bi bi-pencil-square update-task"></i></span>
                                <span><i className="bi bi-dash"></i></span>
                            </div>
                            </div>
                        </button>
                    </h2>
                </div>
                <div id={task.id} className="collapse" aria-labelledby={"heading" + task.id} data-bs-parent="#accordion">
                    <div className="card-body">
                    <div className="card-text mx-3">
                        <p>
                        { task?.description }
                        </p>
                    </div>
                    <hr className="m-2" />
                    <div className="row justify-content-between">
                        <div className="row pt-2">
                        <div className="col-6 text-center">
                            <span className="fw-bold"><i className="bi bi-wallet2 fs-6 pe-2"></i>Budget</span>
                        </div>
                        <div className="col-6 text-center">
                            <span className="text-success">${ task?.lowPrice } - ${ task?.highPrice }</span>
                        </div>
                        </div>
                        <div className="row pt-2">
                        <div className="col-6 text-center">
                            <span className="fw-bold"><i className="bi bi-at fs-4"></i>Contact</span>
                        </div>
                        <div className="col-6 text-center">
                            <span className="text-primary">{ task?.email }</span>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row card-footer ps-0 pe-0 me-0 ms-0">
                    <div className="col text-start ps-3">
                        <span className="text-muted">{ task?.dateAdded }</span>
                    </div>
                    <div className="col d-flex p-0 pe-3 justify-content-end">
                        <button type="button" className="btn btn-outline-primary btn-sm rounded-pill fs-6 w-25 pb-1 text-primary">
                        <i className="bi bi-pin fs-6"></i>Pin
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default TaskView;