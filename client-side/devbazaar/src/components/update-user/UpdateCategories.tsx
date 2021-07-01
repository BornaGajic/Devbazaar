import { observer } from "mobx-react";
import { UserStore } from "../../stores/user-stores/UserStore";

interface UpdateCategoriesProps
{
    userStore: UserStore;
}

const UpdateCategories = observer(({ userStore }: UpdateCategoriesProps ) => {

    return (
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
    );
});

export default UpdateCategories;