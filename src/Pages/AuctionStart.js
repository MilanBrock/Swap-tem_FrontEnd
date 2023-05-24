import * as React from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import AuctionCatalog from "../RenderComponents/Auctions/AuctionCatalog";
import ItemCatalog from "../RenderComponents/Inventory/ItemCatalog";
import AuctionList from "./AuctionList";


export default function AdminPanel() {

    const navigate = useNavigate();
    const params = useParams();
    const [items, setItems] = useState([]);
    const [auctionMinOffer, setAutionMinOffer] = useState(0);
    const [itemIds, setItemIds] = useState([]);

    // Get user's items
    useEffect(() => {
        fetch('http://localhost:8080/inventory/'+ params.userId)

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setItems(data);
            }).catch((err) => {
            console.log(err.message);
        });
        //Runs only on the first render
    }, []);


    // Add itemIds that are selected to array
    const handleSelectItems = (itemInput) => {
        let isSelected = false;

        itemIds.map(itemId => {
            if (itemId === itemInput.id){
                isSelected = true;
            }
        })
        if(isSelected){
            setItemIds(current =>
                current.filter(itemId => itemId !== itemInput.id)
            );
        } else {
            itemIds.push(itemInput.id)
        }
    };


    // Post the auction information to back end
    const postAuction = async () => {
        await fetch('http://localhost:9090/auctions', {
            method: 'POST',
            body: JSON.stringify({
                ownerId: params.userId,
                ownerItems: itemIds,
                minimalOffer: auctionMinOffer
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((data) => {
            })
            .catch((err) => {
                console.log(err.message);
            });
    };


    // Activate post request and return to auction list
    const handleSubmit = (e) => {
        e.preventDefault();
        postAuction();
        navigate("/auctionList/" + params.userId);
    };


    return (
        <div>
            <br/>
            <div className={"row"}>
                <div className={"col"} >{}</div>
                <div className={"col"} >{<Card>
                    <Card.Body>
                        <Card.Title>Add Auction</Card.Title>
                        <Form onSubmit={handleSubmit}>

                            <Form.Label>Minimum offer</Form.Label>
                            <Form.Control type="number" className="" value={auctionMinOffer}
                                          onChange={(e) => setAutionMinOffer(e.target.value)}/>
                            <br/>
                            <Form.Label>Select items for auction</Form.Label>
                            <br/>
                            <ItemCatalog items={items} itemClickActionHandler={handleSelectItems} itemClickActionInput={"Checked"}/>
                            <br/>
                            <Button variant="primary" type="submit">
                                Start Auction
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>}</div>
                <div className={"col"} >{}</div>
            </div>
        </div>

    );
}