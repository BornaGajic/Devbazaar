import { observer } from "mobx-react";
import React, { useState } from "react";

import { RootStore } from "../../stores";
import { TaskPageStore } from "../../stores/page-stores";
import { UiState } from "../../stores/ui-store/UiState";

import TaskView from "../task/TaskView";

import './TaskList.css';

interface TaskListProps
{
    taskPageStore: TaskPageStore;

    UiState: UiState;
}

const TaskList = observer(({ taskPageStore, UiState } : TaskListProps) => {

    // local observable (ili state?) currentPageNumber
    //let tasks = taskPageStore.tasks_.get()

    return (
        <div id="accordionContainer" className="row w-100 justify-content-start">
            <div className="col-lg-7 col-md-8 col-sm-9 col-12 m-0 p-0">
                <div id="accordion" className="myaccordion mt-5">
                    <div className="p-4 text-center">
                        <h3>Tasks</h3>                                
                        <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia</p>
                    </div>
                    {
                        //[...Array(UiState.itemsPerPage)].map(idx => <TaskView />)
                    }
                </div>
            </div>
        </div>
    );
});

export default TaskList;