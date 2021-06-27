import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Route } from "react-router";
import PageNavigation from "../components/page-navigation/PageNavigation";
import TaskActions from "../components/task-actions/TaskActions";
import TaskList from "../components/task-list/TaskList";
import { useQuery } from "../hooks/useQuery";
import { useStores } from "../hooks/useStores";

import { RootStore } from "../stores";
import { TaskPageStore } from "../stores/page-stores";

interface BrowseTaskPageProps
{
    taskPageStore: TaskPageStore;
}

const BrowseTaskPage = observer(({ taskPageStore } : BrowseTaskPageProps) => {

    let query = useQuery();

    let maxPages = taskPageStore.tasks_.size;

    return (
        <div>
            {
                taskPageStore.isLoading ?
                (
                    <div className="d-flex justify-content-center min-vw-100">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
		            </div>
                ) : 
                (
                    <div>
                        <TaskList 
                            taskPageStore={taskPageStore}
                            pageNumber={Number.parseInt(query.get("pageNumber") ?? '1')}
                        />
                        <div className="" style={{marginRight: "15%"}}>
                            <PageNavigation 
                                maxPages={maxPages} 
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
});

export default BrowseTaskPage;