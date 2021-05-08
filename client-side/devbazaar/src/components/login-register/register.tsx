import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { useStores } from '../../hooks/useStores';
import { Business } from '../../models';

import './login.css';

interface IRegisterProps
{
    naslov : string
}

const Register = observer(({naslov} : IRegisterProps) =>
{
    const store = useStores();

    function f (): void
    {
        let role = store.userStore.user.role;
        
        let x = store.userStore.user.roleData.get(role) as Business;
        
        x.description = 'WOW';
    };

    return (
        <div className="d-flex justify-content-center">
            <button onClick={() => f()}>click za WOW</button>
            <br/>
            <div>
                { JSON.stringify(store.userStore.user) }
            </div>
            <br/>
            <div>
                { JSON.stringify(store.businessStore.businessCardList) }
            </div>
        </div>
    );
})

export default Register;