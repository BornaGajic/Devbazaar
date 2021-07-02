import { observer } from "mobx-react";
import React, { SyntheticEvent, useState } from "react";
import { ClientTaskStore } from "../stores/user-stores/client-stores/ClientTaskStore";

interface NewTaskPageProps
{
    myTaskStore: ClientTaskStore;
}

const NewTaskPage = observer(({ myTaskStore }: NewTaskPageProps) => {

    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [minCost, setMinCost] = useState(0);
    let [maxCost, setMaxCost] = useState(0);

    let removeFieldValues = () => {
        document.getElementById("title")!.nodeValue = '';
        document.getElementById("description")!.nodeValue = '';
        document.getElementById("lowPrice")!.nodeValue = '';
        document.getElementById("maxPrice")!.nodeValue = '';
    }

    let handleCancel = (e: SyntheticEvent) => {
        e.preventDefault();

        setTitle('');
        setDescription('');
        setMinCost(0);
        setMaxCost(0);

        removeFieldValues();
    };

    let handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        myTaskStore.createTask({
            description: description,
            title: title,
            highPrice: maxCost,
            lowPrice: minCost
        });

        removeFieldValues();
    };

    return (
    <div>
        <h1 className="display-4 d-flex justify-content-start mt-5" style={{marginLeft: "25%"}}>Create new task</h1>
            <div className="row justify-content-start">
                <div className="col-6 mt-5" style={{marginLeft: "14%"}}>
                    <div className="card shadow">
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label text-secondary fw-bold ps-1" htmlFor="title">Title</label>
                                        <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" id="title" placeholder="Title"/>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="form-label text-secondary fw-bold ps-1" htmlFor="description">Description</label>
                                        <textarea onChange={(e) => setDescription(e.target.value)} typeof="text" className="form-control" id="description" placeholder="Description" aria-multiline="true"></textarea>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col w-50">
                                        <label className="form-label text-secondary fw-bold ps-1" htmlFor="lowPrice">Min cost</label>
                                        <input onChange={(e) => setMinCost(Number.parseInt(e.target.value))} type="number" className="form-control" id="lowPrice" placeholder="Min cost that you're willing to pay" aria-multiline="true"/>
                                    </div>
                                    <div className="col w-50">
                                        <label className="form-label text-secondary fw-bold ps-1" htmlFor="maxPrice">Max cost</label>
                                        <input onChange={(e) => setMaxCost(Number.parseInt(e.target.value))} type="number" className="form-control" id="maxPrice" placeholder="Max cost that you're willing to pay" aria-multiline="true"/>
                                    </div>
                                </div>
                                
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success mt-4" onClick={handleSubmit}>Save changes</button>
                                    <button className="btn btn-secondary mt-4" onClick={handleCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="alert alert-success" role="alert">
              A simple success alert—check it out!
            </div>
    </div>
    );
});

export default NewTaskPage;