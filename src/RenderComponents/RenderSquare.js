import drop from "../DragAndDrop/Drop";
import allowDrop from "../DragAndDrop/AllowDrop";
import drag from "../DragAndDrop/Drag";
import React from "react";
import Happy from "../DragAndDrop/happy2.png";

const RenderSquare = ({item}) => {
    if(item){
        return (
            <div className={"square"} id={item.id} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}>
                <img src={Happy} id={item.id} draggable={"true"} onDragStart={(event) => drag(event)} style={{width:"60px", height:"60px"}}/>
                <label>{item.name}</label>
            </div>
        );
    }
}

export default RenderSquare;