import * as React from 'react';
import Button from "react-bootstrap/Button";
import ItemCatalog from "../RenderComponents/Inventory/ItemCatalog";
import {useEffect, useState} from "react";
import {Container , Alert} from 'react-bootstrap'


export default function Inventory() {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(true);



    // Items van gebruiker ophalen
    useEffect(() => {

        fetch('http://localhost:8080/inventory', {
            headers: {
                "authentication": localStorage.getItem("authentication"),
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setItems(data);
                setError(false);
            }).catch((err) => {
            console.log(err.message);
        });
    }, []);


    const errorMessage = () => {
        return (
            <Alert variant="danger text-center">Could not load inventory</Alert>
        );
    };




    return (
        <div>
            <br/>

            <div className={"row"}>
                <div className={"col"} style={{marginLeft:"9%"}}><h1>Inventory</h1></div>
                <div className={"col"}>{error && errorMessage()}</div>
                <div className={"col"}></div>
            </div>
            <br/>
            <div className={"row"} style={{marginLeft:"9%"}}>
                <ItemCatalog items={items} itemClickActionInput={"Inspect"} />
            </div>
        </div>
    );
}