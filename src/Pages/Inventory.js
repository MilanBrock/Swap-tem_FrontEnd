import * as React from 'react';
import Button from "react-bootstrap/Button";
import ItemCatalog from "../RenderComponents/Inventory/ItemCatalog";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Inventory() {

    const params = useParams();
    const [items, setItems] = useState([]);


    // Items van gebruiker ophalen
    useEffect(() => {
        fetch('http://localhost:8080/inventory/' + params.userId)
            .then((response) => response.json())
            .then((data) => {
                setItems(data);
            }).catch((err) => {
            console.log(err.message);
        });
    }, []);


    return (
        <div>
            <br/>
            <div className={"row"}>

                <div style={{marginLeft:"9%"}}>
                    <h1>Inventory</h1>
                    <br/>
                 <ItemCatalog items={items} itemClickActionInput={"Inspect"} />
                </div>
            </div>
        </div>
    );
}