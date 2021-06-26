import { observer } from "mobx-react";
import PageNavigation from "../components/page-navigation/PageNavigation";
import TaskActions from "../components/task-actions/TaskActions";
import TaskList from "../components/task-list/TaskList";
import { RootStore } from "../stores";
import { MyTaskPageStore } from "../stores/page-stores/MyTaskPageStore";

interface MyTaskPageProps
{
    myTaskPageStore: MyTaskPageStore;
}

const MyTaskPage = observer(({ myTaskPageStore }: MyTaskPageProps) => {

    let maxPages = myTaskPageStore.tasks_.size;

    return (
        <div>
            {
                myTaskPageStore.isLoading ? 
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
                            taskPageStore={myTaskPageStore}
                        />
                        <TaskActions />
                        <div className="" style={{marginRight: "15%"}}>
                            <PageNavigation maxPages={maxPages} />
                        </div>
                    </div>
                )
            }
        </div>
    );
});

export default MyTaskPage;