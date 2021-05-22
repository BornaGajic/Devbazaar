import { observer } from "mobx-react";
import Card from "./card/Card";

const CardList = observer(() => {

    return (
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4 m-3">
            <div className="col">
                <Card />
            </div>

            <div className="col">
                <Card />
            </div>

            <div className="col">
                <Card />
            </div>

            <div className="col">
                <Card />
            </div>

            <div className="col">
                <Card />
            </div>

            <div className="col">
                <Card />
            </div>
        </div>
    );
});

export default CardList;