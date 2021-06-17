import { observer } from "mobx-react";
import PageNavigation from "../components/page-navigation/PageNavigation";
import TaskActions from "../components/task-actions/TaskActions";
import TaskList from "../components/task-list/TaskList";
import { RootStore } from "../stores";

const MyTaskPage = observer(({ rootStore }: { rootStore: RootStore }) => {

    let maxPages = rootStore.taskPageStore.tasks_.size;

    return (
        <div>
            <TaskList 
                taskPageStore={rootStore.myTaskPageStore}
            />
            <TaskActions />
            <div className="" style={{marginRight: "15%"}}>
				<PageNavigation maxPages={maxPages} />
			</div>
        </div>
    );
});

export default MyTaskPage;