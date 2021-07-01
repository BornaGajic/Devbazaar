import { observer } from "mobx-react";

const UpdateClientSettings = observer(() => {

    return (
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
    );
});

export default UpdateClientSettings;