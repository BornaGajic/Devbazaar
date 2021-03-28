import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks/useStores';

import './login.css';

interface IRegisterProps
{
    naslov : string
}

const Register = observer(({naslov} : IRegisterProps) =>
{
    const store = useStores();

    return (
        <div className="d-flex justify-content-center">
            <div>
                { JSON.stringify(store.UserStore.User.asJson) }
            </div>
            <br/>
            <div>
                { JSON.stringify(store.BusinessStore.businessList) }
            </div>
        </div>
    );
})

export default Register;