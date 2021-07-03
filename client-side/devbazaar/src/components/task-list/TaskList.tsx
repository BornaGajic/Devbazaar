import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Task } from "../../models";

import { RootStore } from "../../stores";
import { TaskPageStore } from "../../stores/page-stores";
import { MyTaskPageStore } from "../../stores/page-stores/MyTaskPageStore";
import { UiState } from "../../stores/ui-store/UiState";

import TaskView from "../task/TaskView";

import './TaskList.css';

interface TaskListProps
{
    taskPageStore: TaskPageStore | MyTaskPageStore;
    pageNumber: number;
}

const TaskList = observer(({ taskPageStore, pageNumber } : TaskListProps) => {

    let tasks = taskPageStore?.tasks_.get(pageNumber) as Task[];

    let isMyTask = taskPageStore instanceof MyTaskPageStore ? true : false;

    return (
        <div id="accordionContainer" className="row w-100 justify-content-start">
            <div className="col-lg-7 col-md-8 col-sm-9 col-12 m-0 p-0">
                <div id="accordion" className="myaccordion mt-5">
                    <div className="p-4 text-center">
                        <h3>Tasks</h3>                                
                        <p className="lead">Daily dose of work orders!</p>
                    </div>
                    {
                        [...Array(tasks.length).keys()].map(idx => <TaskView task={ tasks[idx] } isMyTask={isMyTask} />)
                    }
                </div>
            </div>
        </div>
    );
});

export default TaskList;