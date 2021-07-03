import { observer } from "mobx-react";
import { SyntheticEvent, useState } from "react";
import { UserRole } from "../../common";
import { UserStore } from "../../stores/user-stores/UserStore";

interface UpdateLocationSettingsProps
{
    userStore: UserStore;
}

const UpdateLocationSettings = observer(({ userStore }: UpdateLocationSettingsProps) => {

    let [country, setCountry ] = useState('');
    let [city, setCity] = useState('');
    let [postalCode, setPostalCode] = useState('');

    const resetFields = () => {
        document.getElementById("country")!.nodeValue = '';
        document.getElementById("city")!.nodeValue = '';
        document.getElementById("postalCode")!.nodeValue = '';
    };

    const handleSaveChanges = (e: SyntheticEvent) => {
        e.preventDefault();

        let user = userStore.roleData.get(userStore.user.role)!;

        user.update({
            country: country,
            city: city,
            postalCode: postalCode
        }).then(() => window.location.reload());
    };

    const handleCancel = (e: SyntheticEvent) => resetFields();

    return (
        <div className="card-body mx-3">
            <form onSubmit={handleSaveChanges}>
                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="country" className="form-label text-secondary fw-bold text-muted p-0">Country</label>
                        <input onChange={(e) => setCountry(e.target.value)} type="text" placeholder="e.g. Croatia" className="form-control" id="country"/>
                    </div>
                    <div className="col">
                        <label htmlFor="city" className="form-label text-secondary fw-bold text-muted p-0">City</label>
                        <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="e.g. Zagreb" className="form-control" id="city"/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-6">
                        <label htmlFor="postalcode" className="form-label text-secondary fw-bold text-muted p-0">Postal code</label>
                        <input onChange={(e) => setPostalCode(e.target.value)} type="text" placeholder="e.g. 10000" className="form-control" id="postalcode"/>
                    </div>
                </div>
                <div className="mb-3 text-center mb-0 d-flex justify-content-around">
                    <button type="submit" className="btn btn-sm btn-primary">Save changes</button>
                    <button onClick={handleCancel} className="btn btn-sm btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
});

export default UpdateLocationSettings;