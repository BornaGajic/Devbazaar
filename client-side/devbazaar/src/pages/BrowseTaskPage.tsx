import { observer } from "mobx-react";
import React, { useState } from "react";
import { Route } from "react-router";
import PageNavigation from "../components/page-navigation/PageNavigation";
import TaskActions from "../components/task-actions/TaskActions";
import TaskList from "../components/task-list/TaskList";
import { useStores } from "../hooks/useStores";

import { RootStore } from "../stores";

const BrowseTaskPage = observer(({ rootStore } : { rootStore: RootStore }) => {

    let maxPages = rootStore.taskPageStore.tasks_.size;

    return (
        <div>
            <TaskList 
                taskPageStore={rootStore.taskPageStore} 
                UiState={ rootStore.UiState }
            />
            <TaskActions />
            <div className="" style={{marginRight: "15%"}}>
				<PageNavigation maxPages={maxPages} />
			</div>
        </div>
    );
});

export default BrowseTaskPage;