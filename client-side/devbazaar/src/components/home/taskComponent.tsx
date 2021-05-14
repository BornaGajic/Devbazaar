import React from 'react';
import { observer } from "mobx-react";
import { ClientTaskStore } from '../../stores/user-stores/client-stores/ClientTaskStore';
import { Client } from '../../models';
import { ITask } from '../../models/contracts';

const TaskView = observer(({taskStore}: {taskStore: ClientTaskStore}) =>
{
    let newTask = {} as ITask;
    return (
        <div>
            <label htmlFor="Description">Description:</label><br/>
            <input type="text" name="description" id="descriptionBox" onChange={ (e) => newTask.description = e.target.value} /><br/><br/>

            <label htmlFor="Low price">Low price:</label><br/>
            <input type="text" name="lowPrice" id="lowPriceBox" onChange={ (e) => newTask.lowPrice = Number.parseFloat(e.target.value)  } /><br/><br/>

            <label htmlFor="High price">High price:</label><br/>
            <input type="text" name="highPrice" id="highPriceBox" onChange={ (e) => newTask.highPrice = Number.parseFloat(e.target.value) } /><br/><br/>

            <button onClick={() => taskStore.createTask(newTask)}>
                Add new task
            </button>
            <button onClick={() => taskStore.updateTask(newTask)}>
                Update task
            </button>

            <label htmlFor="taskid">Task id to delete:</label><br/>
            <input type="text" name="taskid" id="taskid" onChange={ (e) => newTask.id = e.target.value } /><br/><br/>            
            <button onClick={() => taskStore.removeTask(newTask.id ?? '')}>
                Delete task
            </button>
        </div>
    );
});

export default TaskView;