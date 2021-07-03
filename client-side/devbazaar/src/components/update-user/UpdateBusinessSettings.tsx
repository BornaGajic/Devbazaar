import { observer } from "mobx-react";
import { SyntheticEvent, useState } from "react";
import { BusinessStore } from "../../stores/user-stores/business-stores/BusinessStore";

interface UpdateBusinessSettingsProps
{
    businessStore: BusinessStore;
}

const UpdateBusinessSettings = observer(({ businessStore }: UpdateBusinessSettingsProps) => {

    let [about, setAbout] = useState(businessStore.business.about);
    let [webpage, setWebpage] = useState(businessStore.business.website);
    let [description, setDescription] = useState(businessStore.business.description);
    let [available, setAvailable] = useState(businessStore.business.available);

    const resetFields = () => {
        document.getElementById("about")!.nodeValue = '';
        document.getElementById("webpage")!.nodeValue = '';
        document.getElementById("description")!.nodeValue = '';
        (document.getElementById("available")! as HTMLInputElement).checked = businessStore.business.available;
    };

    const handleSaveChanges = (e: SyntheticEvent) => {
        e.preventDefault();

        let business = businessStore.business;

        business.about = about;
        business.website = webpage;
        business.description = description;
        business.available = available;

        businessStore.business.update(business).then(() => window.location.reload());
    };

    const handleCancel = (e: SyntheticEvent) => resetFields();
    
    return (
        <div className="card-body mx-3">
            <form onSubmit={handleSaveChanges}>
                <div className="row mb-4">
                    <label className="form-label text-secondary fw-bold text-muted p-0" htmlFor="about">About</label>
                    <textarea onChange={(e) => setAbout(e.target.value)} className="form-control" id="about"></textarea>
                </div>
                <div className="row mb-4">
                    <label className="form-label text-secondary fw-bold text-muted p-0" htmlFor="description">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" id="description"></textarea>
                </div>
                <div className="row mb-4">
                    <label htmlFor="website" className="form-label text-secondary fw-bold text-muted p-0">Website</label>
                    <input onChange={(e) => setWebpage(e.target.value)} type="text" className="form-control" id="website" placeholder="something.com/else"/>
                </div>
                <div className="form-check form-switch mb-4">
                    <label className="form-check-label text-secondary fw-bold text-muted" htmlFor="flexSwitchCheckChecked">Available</label>
                    <input onChange={(e) => setAvailable(e.currentTarget.checked)} className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={businessStore.business.available} />
                </div>
                <div className="mb-3 text-center mb-0 d-flex justify-content-around">
                    <button className="btn btn-sm btn-primary">Save changes</button>
                    <button onClick={handleCancel} className="btn btn-sm btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
});

export default UpdateBusinessSettings;