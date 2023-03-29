import React from "react";
import Happy from "./happy.png";
import Cry from "./CRY.png";
import Cool from "./Cool.png";

class Grid extends React.Component {
    render() {

        return (
            <div>
                <div className={"row"}>
                    <div className={"column"}>
                        <input className={"small-input"} id={"name"} value={"name"}></input>
                        <input className={"small-input"} id={"description"} value={"description"}></input>
                        {/*
                        <button className={"small-button"} onClick={() => addItems()}>Add Item!</button>
*/}
                    </div>
                </div>

                <br/><br/>
                <div className={"row"}>
                    <div className={"column"}>
                        <div className="board-row">
                            {this.renderSquare({
                                name: "Happy",
                                src: Happy,
                                grid: "grid1"
                            })}
                            {this.renderSquare({
                                name: "Cry",
                                src: Cry,
                                grid: "grid2"
                            })}
                            {this.renderSquare({
                                name: "Cool",
                                src: Cool,
                                grid: "grid3"
                            })}
                        </div>
                        <div className="board-row">
                            {this.renderGrid("grid4")}
                            {this.renderGrid("grid5")}
                            {this.renderGrid("grid6")}
                        </div>
                        <div className="board-row">
                            {this.renderGrid("grid7")}
                            {this.renderGrid("grid8")}
                            {this.renderGrid("grid9")}
                        </div>
                    </div>
                    <div className={"column"}>
                        <div className="board-row">
                            {this.renderGrid("grid10")}
                            {this.renderGrid("grid11")}
                            {this.renderGrid("grid12")}
                        </div>
                        <div className="board-row">
                            {this.renderGrid("grid13")}
                            {this.renderGrid("grid14")}
                            {this.renderGrid("grid15")}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}