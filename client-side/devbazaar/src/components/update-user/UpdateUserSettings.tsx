import { observer } from "mobx-react";
import { useState } from "react";

const UpdateUserSettings = observer(() => {

    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <p className="text-primary m-0 fw-bold">User settings</p>
            </div>
            <div className="card-body">
                <form>
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
                    <div className="mb-3 text-center mb-0">
                        <button className="btn btn-sm btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default UpdateUserSettings;