import { observer } from "mobx-react";
import { useParams } from "react-router";

interface UpdateTaskUrlParams
{
    taskId: string;
}

const UpdateTaskPage = observer(() => {

    let { taskId } = useParams<UpdateTaskUrlParams>();
    
    return (
    <div>
        <h1 className="display-4 d-flex justify-content-start mt-5" style={{marginLeft: "25%"}}>Update task</h1>
            <div className="row justify-content-start">
                <div className="col-6 mt-5" style={{marginLeft: "14%"}}>
                    <div className="card shadow">
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col">
                                        <label className="form-label text-secondary fw-bold ps-1" htmlFor="title">Title</label>
                                        <input type="text" className="form-control" id="title" placeholder="Title"/>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="form-label text-secondary fw-bold ps-1" htmlFor="description">Description</label>
                                        <textarea typeof="text" className="form-control" id="description" placeholder="Description" aria-multiline="true"></textarea>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col w-50">
                                        <label className="form-label text-secondary fw-bold ps-1" htmlFor="lowPrice">Min cost</label>
                                        <input type="number" className="form-control" id="lowPrice" placeholder="Min cost that you're willing to pay" aria-multiline="true"/>
                                    </div>
                                    <div className="col w-50">
                                        <label className="form-label text-secondary fw-bold ps-1" htmlFor="maxPrice">Max cost</label>
                                        <input type="number" className="form-control" id="maxPrice" placeholder="Max cost that you're willing to pay" aria-multiline="true"/>
                                    </div>
                                </div>
                                
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-success mt-4" onClick={(e) => e.preventDefault()}>Save changes</button>
                                    <button className="btn btn-secondary mt-4" onClick={(e) => e.preventDefault()}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
});

export default UpdateTaskPage;