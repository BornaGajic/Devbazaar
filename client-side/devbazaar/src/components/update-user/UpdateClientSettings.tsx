import { observer } from "mobx-react";
import { SyntheticEvent, useState } from "react";
import { ClientStore } from "../../stores/user-stores/client-stores";

interface UpdateClientSettingsProps
{
    clientStore: ClientStore;
}

const UpdateClientSettings = observer(({ clientStore }: UpdateClientSettingsProps) => {

    let [about, setAbout] = useState('');
    let [webpage, setWebpage] = useState('');

    const resetFields = () => {
        document.getElementById("about")!.nodeValue = '';
        document.getElementById("webpage")!.nodeValue = '';
    };

    const handleSaveChanges = (e: SyntheticEvent) => {
        e.preventDefault();

        clientStore.client.update({
            about: about,
            website: webpage
        }).then(() => window.location.reload());
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
                    <label htmlFor="webpage" className="form-label text-secondary fw-bold text-muted p-0">Webpage</label>
                    <input onChange={(e) => setWebpage(e.target.value)} type="text" className="form-control" id="webpage" placeholder="something.com/else"/>
                </div>
                <div className="mb-3 text-center mb-0 d-flex justify-content-around">
                    <button className="btn btn-sm btn-primary">Save changes</button>
                    <button onClick={handleCancel} className="btn btn-sm btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
});

export default UpdateClientSettings;