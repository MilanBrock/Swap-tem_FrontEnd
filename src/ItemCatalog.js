import React, {useEffect, useState} from "react";
import RenderSquare from "./RenderComponents/RenderSquare";
import Happy from "./happy.png";
import Cry from "./CRY.png";
import Cool from "./Cool.png";
import RenderGrid from "./RenderComponents/RenderGrid";

export default function ItemCatalog({items}){

    console.log(items);

    const listItems = items.map((item, index) =>
        <div className={"row"} key={index}>
            <div className={"column"}>
                <div className="board-row">
                    <div>
                        <RenderSquare item={item}/>
                    </div>
                </div>
            </div>
        </div>
    );

    return(
        <div>
            <ul>{listItems}</ul>
        </div>
    );
}

