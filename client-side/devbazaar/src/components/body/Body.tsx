import { observer } from "mobx-react";
import Main from "../main/Main";
import Sidebar from "../main/sidebar/SideBar";
import { TopBar } from "../top-bar";

const Body = observer(() => {

    return (
        <div id="wrapper">
            <TopBar />
            <Main />
        </div>
    );
});

export default Body;