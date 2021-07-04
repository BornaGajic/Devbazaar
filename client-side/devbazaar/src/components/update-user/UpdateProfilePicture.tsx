import { observer } from "mobx-react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { UserStore } from "../../stores/user-stores/UserStore";

const UpdateProfilePicture = observer(({ userStore }: { userStore: UserStore }) => {

    let [image, setImage] = useState<Blob>();

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files ?? [];
        let blob = files[0].slice(0);
        
        setImage(blob);
    }

    const handleCancle = (e: SyntheticEvent) => {
        (document.getElementById("img") as HTMLInputElement).value = '';
    }

    const handleApplyChanges = (e: SyntheticEvent) => {
        if (image)
        {
            userStore.user.addImage(image).then(() => window.location.reload());
        }
    }

    return (
        <div className="card mb-3">
            <div className="card-body text-center shadow">
                {
                    userStore.user.imageUrl ?
                        <img src={userStore.user.imageUrl} width="160" height="160" />
                    :
                        <svg className="rounded-circle mb-3 mt-4" width="160" height="160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: avatar" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <circle cx="80" cy="80" r="80" fill="#868e96"></circle>
                        </svg>
                }
                <div className="my-3 d-flex justify-content-around">
                    <button onClick={handleApplyChanges} className="btn btn-primary btn-sm">
                        Apply changes
                    </button>
                    <input id="img" onChange={handleImageChange} type="file" accept=".jpg, .png" multiple={false} className="btn btn-primary btn-sm" />
                    <button onClick={handleCancle} className="btn btn-primary btn-sm">
                        Cancle
                    </button>
                </div>
            </div>
        </div>
    );
});

export default UpdateProfilePicture;