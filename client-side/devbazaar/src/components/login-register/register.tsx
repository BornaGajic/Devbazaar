import React from 'react';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { useStores } from '../../hooks/useStores';
import { Business, Client } from '../../models';

import './login.css';
import { TaskCrud } from '../../models/crud';
import { Task } from '../../models/Task';
import TaskView from '../home/taskComponent';

const Register = observer(() =>
{
    const store = useStores();
    
    console.log("register");

    let clist = store.userStore.clientStore.clienTaskStore.tasks.map((task: Task) =>
    <ul key={ task.id }>
        <li>{ task.id }</li>
        <li>{ task.description }</li>
        <li>{ task.highPrice }</li>
        <li>{ task.lowPrice }</li>
        <li>--------------------------</li>
    </ul>
    );

    let taskid: string = '';
    return (
        <div className="w-25 col">

            <TaskView taskStore={store.userStore.clientStore.clienTaskStore} />

            <div className="row">
                <button onClick={() => store.authStore.logoutAsync()}>
                    Logout
                </button>
            </div>

            <div className="row">
                { clist }<br/>
                { JSON.stringify(store.userStore.user.asJson) }
            </div>
        </div>
    );
})

export default Register;