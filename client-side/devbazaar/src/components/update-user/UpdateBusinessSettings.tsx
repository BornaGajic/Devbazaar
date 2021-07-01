import { observer } from "mobx-react";

const UpdateBusinessSettings = observer(() => {

    return (
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
    );
});

export default UpdateBusinessSettings;