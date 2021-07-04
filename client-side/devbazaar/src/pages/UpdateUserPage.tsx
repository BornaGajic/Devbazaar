import { observer } from "mobx-react";
import React, { useState } from "react";
import { UserRole } from "../common";
import UpdateBusinessSettings from "../components/update-user/UpdateBusinessSettings";
import UpdateCategories from "../components/update-user/UpdateCategories";
import UpdateClientSettings from "../components/update-user/UpdateClientSettings";
import UpdateLocationSettings from "../components/update-user/UpdateLocationSettings";
import UpdateProfilePicture from "../components/update-user/UpdateProfilePicture";
import UpdateUserSettings from "../components/update-user/UpdateUserSettings";
import { UserStore } from "../stores/user-stores/UserStore";

interface UpdateUserPageProps
{
    userStore: UserStore;
}

const UpdateUserPage = observer(({ userStore }: UpdateUserPageProps) => {

    let user = userStore.user;

    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-center mt-4">
                        <h1 className="display-4" >Edit profile</h1>
                    </div>
                </div>
                {
                    user.role === UserRole.BUSINESS ? 
                        <div className="col">
                            <div className="d-flex justify-content-center mt-5">
                                <button className="btn btn-primary">
                                    Preview changes
                                </button>
                            </div>
                        </div>
                    : true
                }
            </div>
            <div className="row justify-content-start mt-5">
                <div className="col-lg-4">
                    <UpdateProfilePicture userStore={userStore}/>
                    <UpdateUserSettings userStore={userStore}/>
                    {
                        user.role === UserRole.BUSINESS ? 
                            <UpdateCategories userStore={userStore}/>
                        : true
                    }
                </div>
                <div className="col-lg-6 ms-md-3">
                    {
                        user.role === UserRole.CLIENT ? 
                            <div className="card shadow mb-3">
                                <div className="card-header py-3">
                                    <p className="text-primary m-0 fw-bold">Settings</p>
                                </div>
                            <UpdateClientSettings clientStore={userStore.clientStore} />
                            </div>
                        :
                            <div className="card shadow mb-3">
                                <div className="card-header py-3">
                                    <p className="text-primary m-0 fw-bold">Settings</p>
                                </div>
                                <UpdateBusinessSettings businessStore={userStore.businessStore} />
                            </div>
                    }
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">Contact settings</p>
                        </div>
                        <UpdateLocationSettings userStore={userStore}/>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default UpdateUserPage;