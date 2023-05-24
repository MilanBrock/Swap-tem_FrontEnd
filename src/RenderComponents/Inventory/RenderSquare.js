import drop from "../../DragAndDrop/Drop";
import allowDrop from "../../DragAndDrop/AllowDrop";
import drag from "../../DragAndDrop/Drag";
import React, {useState} from "react";
import Happy from "../../DragAndDrop/happy2.png";
import RenderItem from "./RenderItem"

export default function RenderSquare ({item, gridname, itemClickHandler, itemClickActionInput}){


    const [showItem, isShowItem] = useState(false)
    const [checkedItem, isCheckedItem] = useState(false)

    const handleClick = (e) => {
        if(itemClickActionInput == "Inspect"){
            itemClickHandler(item)
        }
        else if(itemClickActionInput == "Checked"){
            isCheckedItem(!checkedItem);
            itemClickHandler(item);
        }
    }

    if(item){
        return (
            <div className={"square"} id={gridname} onClick={handleClick} style={{width:"80px", height:"80px", border:"solid"}}>
                {!checkedItem && <img src={Happy} id={item.name} className={"itemNormal"}/>
                || <img src={Happy} id={item.name} className={"itemChecked"}/>}
            </div>
        );
    }
}

