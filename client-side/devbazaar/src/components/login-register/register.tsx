import React from 'react';

import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import { useStores } from '../../hooks/useStores';
import { Business, Client } from '../../models';

import './login.css';
import { TaskCrud } from '../../models/crud';
import { Task } from '../../models/Task';

const Register = observer(() =>
{
    const store = useStores();
    
    const clist = (store.userStore.roleData.get(store.userStore.user.role) as Client)?.myTasks?.map((task: Task) =>
    <ul key={ task.id }>
        <li>{ task.id }</li>
        <li>{ task.description }</li>
        <li>{ task.highPrice }</li>
        <li>{ task.lowPrice }</li>
        <li>--------------------------</li>
    </ul>
    );

    const newTask = {} as TaskCrud;
    let taskid: string = '';
    return (
        <div className="w-25 col">

            <label htmlFor="Description">Description:</label><br/>
            <input type="text" name="description" id="descriptionBox" onChange={ (e) => runInAction(() => newTask.description = e.target.value)} /><br/><br/>

            <label htmlFor="Low price">Low price:</label><br/>
            <input type="text" name="lowPrice" id="lowPriceBox" onChange={ (e) => newTask.lowPrice = Number.parseFloat(e.target.value)  } /><br/><br/>

            <label htmlFor="High price">High price:</label><br/>
            <input type="text" name="highPrice" id="highPriceBox" onChange={ (e) => newTask.highPrice = Number.parseFloat(e.target.value) } /><br/><br/>

            <button onClick={() => (store.userStore.roleData.get(store.userStore.user.role) as Client).createMyTask(newTask)}>
                Add new task
            </button>
            <button onClick={() => (store.userStore.roleData.get(store.userStore.user.role) as Client).updateMyTask(newTask)}>
                Update task
            </button>

            <label htmlFor="taskid">Task id to delete:</label><br/>
            <input type="text" name="taskid" id="taskid" onChange={ (e) => {taskid = e.target.value; newTask.id = e.target.value; } } /><br/><br/>            
            <button onClick={() => (store.userStore.roleData.get(store.userStore.user.role) as Client).deleteMyTask(taskid)}>
                Delete task
            </button>

            <div className="row">
                <button onClick={() => store.authStore.logoutAsync()}>
                    Logout
                </button>
            </div>

            <div className="row">
                { clist }<br/>
                { JSON.stringify(store.userStore.user.asJson) }
            </div>

            <div>
                { JSON.stringify((store.userStore.roleData.get(store.userStore.user.role) as Client)?.myTasks) }
            </div>
        </div>
    );
})

export default Register;