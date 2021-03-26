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
            {
                JSON.stringify(store.UserStore.User.asJson)
            }
        </div>
    );
})

export default Register;