import { runInAction } from "mobx";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PageNavigation from "../components/page-navigation/PageNavigation";
import TaskActions from "../components/task-actions/TaskActions";
import TaskList from "../components/task-list/TaskList";
import { useQuery } from "../hooks/useQuery";
import { RootStore } from "../stores";
import { MyTaskPageStore } from "../stores/page-stores/MyTaskPageStore";

interface MyTaskPageProps
{
    myTaskPageStore: MyTaskPageStore;
}

const MyTaskPage = observer(({ myTaskPageStore }: MyTaskPageProps) => {

    let location = useLocation();
    let query = useQuery();

    useEffect(() => {
        runInAction(() => {
            myTaskPageStore.isLoading = true;
        })
        myTaskPageStore.loadMyTasks().then(() => runInAction(() => myTaskPageStore.isLoading = false));
    }, [location]);

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
                            pageNumber={Number.parseInt(query.get("pageNumber") ?? '1')}
                        />
                        <TaskActions />
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

export default MyTaskPage;