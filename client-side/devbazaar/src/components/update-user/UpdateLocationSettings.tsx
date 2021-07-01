import { observer } from "mobx-react";

const UpdateLocationSettings = observer(() => {

    return (
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
    );
});

export default UpdateLocationSettings;