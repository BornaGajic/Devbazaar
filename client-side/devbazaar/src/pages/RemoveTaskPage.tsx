import { observer } from "mobx-react";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Task } from "../models";
import { MyTaskPageStore } from "../stores/page-stores/MyTaskPageStore";
import { ClientTaskStore } from "../stores/user-stores/client-stores/ClientTaskStore";

interface RemoveTaskPageProps
{
    myTaskStore: ClientTaskStore;
}

const RemoveTaskPage = observer(({ myTaskStore }: RemoveTaskPageProps) => {

    let [start, setStart] = useState(0);
    let [end, setEnd] = useState(6);

    let [search, setSearch] = useState('');

    let myTasks = search === '' ? myTaskStore.tasks : myTaskStore.tasks.filter(el => {
        return el.title!.toLowerCase().indexOf(search.toLowerCase()) !== -1 || el.description!.toLowerCase().indexOf(search.toLowerCase()) !== -1 
    });

    let slices = myTasks.slice(start, end);
    
    if (!myTasks[end])
    {
        document.getElementById("next")?.classList.add("disabled");
    } 
    else
    {
        document.getElementById("next")?.classList.remove("disabled");
    }
    
    if (!myTasks[start - 5])
    {
        document.getElementById("prev")?.classList.add("disabled");
    }
    else
    {
        document.getElementById("prev")?.classList.remove("disabled");
        
    }

    const handleXClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        myTaskStore.removeTask(e.currentTarget.value);
    };  
    
    const handleNextClick = (e: SyntheticEvent) => {
            setStart(end);
            setEnd(end + 5);
    }

    const handlePreviousClick = (e: SyntheticEvent) => {
        setStart(start - 5);
        setEnd(start);
    }

    let handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className="row">
            <div className="col-lg-8 col-sm-10 col-10 mt-5" style={{marginLeft: "10%"}}>
                <div className="card shadow">
                    <div className="card-header">
                        <p className="text-primary fw-bold text-center my-1 fs-3">Remove Tasks</p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col text-center">
                                <label className="form-label">
                                    <input onChange={handleSearchChange} type="search" className="form-control form-control-sm" placeholder="Search task" />
                                </label>
                            </div>
                        </div>
                        <div className="row align-self-center">
                            <ul className="list-group list-group-flush">

                                {
                                    slices.map(task => 
                                        <li className="list-group-item d-flex" key={task.id}>
                                            <div className="col text-start align-self-center">
                                                <span>{task.title}</span>
                                            </div>
                                            <div className="d-none d-sm-block col align-self-center">
                                                {task.description?.slice(0, 100)}
                                            </div>
                                            <div className="col text-end align-self-center">
                                                <button value={task.id} onClick={handleXClick} className="btn shadow-none">
                                                    <i className="bi bi-x fs-4 text-danger"></i>
                                                </button>
                                            </div>
                                        </li>
                                    )    
                                }
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
                                            <li id="prev" onClick={handlePreviousClick} className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
                                            <li id="next" onClick={handleNextClick} className="page-item"><a className="page-link" href="#">Next</a></li>
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