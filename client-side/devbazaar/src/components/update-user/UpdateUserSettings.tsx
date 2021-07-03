import { observer } from "mobx-react";
import { SyntheticEvent, useState } from "react";
import { UserStore } from "../../stores/user-stores/UserStore";

interface UpdateUserSettingsProps
{
    userStore: UserStore;
}

const UpdateUserSettings = observer(({ userStore }: UpdateUserSettingsProps) => {

    let [username, setUsername] = useState(userStore.user.username);
    let [email, setEmail] = useState(userStore.user.email);

    const resetFields = () => {
        document.getElementById("username")!.nodeValue = '';
        document.getElementById("email")!.nodeValue = '';
    };

    const handleSaveChanges = (e: SyntheticEvent) => {
        e.preventDefault();

        userStore.user.update({
            email: email,
            username: username
        }).then(() => window.location.reload());
    };

    const handleCancel = (e: SyntheticEvent) => resetFields();

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">User settings</p>
            </div>
            <div className="card-body">
                <form onSubmit={handleSaveChanges}>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted" htmlFor="username">Username</label>
                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Username"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted" htmlFor="email">Email Adress</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" id="email" placeholder="user@example.com"/>
                        </div>
                    </div>
                    <div className="mb-3 text-center mb-0 d-flex justify-content-around">
                        <button type="submit" className="btn btn-sm btn-primary">Save changes</button>
                        <button onClick={handleCancel} className="btn btn-sm btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default UpdateUserSettings;