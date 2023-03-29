import drop from "../DragAndDrop/Drop";
import allowDrop from "../DragAndDrop/AllowDrop";
import React from "react";

const RenderGrid = () => {
    return (
        <div>
            <div className={"row"}>
                <div className={"square"} id={"grid1"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
                <div className={"square"} id={"grid2"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
                <div className={"square"} id={"grid3"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
            </div>
            <div className={"row"}>
                <div className={"square"} id={"grid4"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
                <div className={"square"} id={"grid5"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
                <div className={"square"} id={"grid6"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
            </div>
            <div className={"row"}>
                <div className={"square"} id={"grid7"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
                <div className={"square"} id={"grid8"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
                <div className={"square"} id={"grid9"} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} style={{width:"80px", height:"80px", border:"solid"}}></div>
            </div>

        </div>

    );
}

export default RenderGrid;