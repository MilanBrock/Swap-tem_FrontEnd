import React, {useEffect, useState} from "react";
import RenderSquare from "./RenderSquare";
import Happy from "../../happy.png";
import Cry from "../../CRY.png";
import Cool from "../../Cool.png";
import RenderGrid from "./RenderGrid";
import RenderItem from "./RenderItem";

export default function ItemCatalog({items, itemClickActionHandler, itemClickActionInput}){

    const [item, setItem] = useState("");
    const [showItem, setShowItem] = useState("");
    const [toggleItem, isToggleItem] = useState(false);

    const [itemClickAction, setItemClickAction] = useState(itemClickActionInput);


    const ShowItemClick = (itemInput) => {
        setShowItem(itemInput)
        isToggleItem(!toggleItem)
    }

    const rows = [];

    for (let i = 0; i < items.length; i += 3) {
        rows.push(
            <div className="row" key={i}>
                {items.slice(i, i + 3).map((item) => (
                    <div className="itemColumn" key={item.id}>
                        {itemClickAction === "Inspect" && <RenderSquare item={item} gridname={i} itemClickHandler={ShowItemClick} itemClickActionInput={"Inspect"}/>
                            || itemClickAction === "Checked" && <RenderSquare item={item} gridname={i} itemClickHandler={itemClickActionHandler} itemClickActionInput={"Checked"}/>
                            || <RenderSquare item={item} gridname={i}/>}
                    </div>
                ))}
            </div>
        );
    }

    return <div className={"row"}>
            <div className={"col"} >{rows}</div>
            {itemClickAction === "Inspect" && toggleItem && <div className={"col"}><RenderItem itemName={showItem.name} itemDescription={showItem.description}/></div>}
            </div>
    ;
}

