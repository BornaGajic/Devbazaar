import { observer } from "mobx-react";
import React, { useState } from "react";
import PageNavigation from "../components/page-navigation/PageNavigation";
import TaskList from "../components/task-list/TaskList";
import { useStores } from "../hooks/useStores";

import { RootStore } from "../stores";

const BrowseTaskPage = observer(({ rootStore } : { rootStore: RootStore }) => {

    return (
        <div>
           <TaskList 
                taskPageStore={rootStore.taskPageStore} 
                UiState={ rootStore.UiState }
            />
           
           <div className="" style={{marginRight: "15%"}}>
				<PageNavigation UiState={rootStore.UiState} />
			</div>
        </div>
    );
});

export default BrowseTaskPage;