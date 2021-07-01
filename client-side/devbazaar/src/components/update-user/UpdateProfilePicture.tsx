import { observer } from "mobx-react";

const UpdateProfilePicture = observer(() => {

    return (
        <div className="card mb-3">
            <div className="card-body text-center shadow">
                <svg className="rounded-circle mb-3 mt-4" width="160" height="160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: avatar" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <circle cx="80" cy="80" r="80" fill="#868e96"></circle>
                </svg>
                <div className="my-3">
                    <button className="btn btn-primary btn-sm">
                        Change photo
                    </button>
                </div>
            </div>
        </div>
    );
});

export default UpdateProfilePicture;