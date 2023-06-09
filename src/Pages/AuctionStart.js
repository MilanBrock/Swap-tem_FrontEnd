import * as React from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import AuctionCatalog from "../RenderComponents/Auctions/AuctionCatalog";
import ItemCatalog from "../RenderComponents/Inventory/ItemCatalog";
import AuctionList from "./AuctionList";
import {Alert} from "react-bootstrap";
import {wait} from "@testing-library/user-event/dist/utils";



export default function AuctionStart() {

    const navigate = useNavigate();
    const params = useParams();
    const [items, setItems] = useState([]);
    const [auctionMinOffer, setAutionMinOffer] = useState(0);
    const [itemIds, setItemIds] = useState([]);

    const [errorInventory, setErrorInventory] = useState(true);

    let errorSubmit = false;
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");



    // Get user's items
    useEffect(() => {
        fetch('http://localhost:8080/inventory', {
            headers: {
                "authentication": localStorage.getItem("authentication"),
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setItems(data);
                setErrorInventory(false)
            }).catch((err) => {
            console.log(err.message);
        });
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
                ownerItems: itemIds,
                minimalOffer: auctionMinOffer
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "authentication": localStorage.getItem("authentication"),
            },
        }).then((response) => response.text())
            .then((data) => {
                if(data === "Auction not added"){
                    errorSubmit = true;
                }
            })
            .catch((err) => {
                errorSubmit = true;
                setShowSubmitError(true);
                console.log(err.message);
            });
    };


    // Activate post request and return to auction list
    const handleSubmit = (e) => {
        e.preventDefault();
        checkAuction();
    };


    const errorMessageInventory = () => {
        return (
            <Alert variant="danger text-center">Could not load inventory</Alert>
        );
    };

    const errorMessageSubmit = () => {
        return (
            <Alert variant="danger text-center">{errorMessage}</Alert>
        );
    };

    const checkAuction = () => {
        setErrorMessage(null);
        if(auctionMinOffer <= 0){
            setErrorMessage("Set the minimum bid");
            setShowSubmitError(true);
        } else if (itemIds.length === 0) {
            setErrorMessage("Select items");
            setShowSubmitError(true);
        } else {
            postAuction();
            wait(500).then(() => {
                if(errorSubmit === true) {
                    setErrorMessage("Unable to start auction");
                    setShowSubmitError(true);
                } else {
                    navigate("/auctionList/");
                }}
            );
        }
    }


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
                            {errorInventory && errorMessageInventory()}
                            <div style={{marginLeft:"3%"}}><ItemCatalog items={items} itemClickActionHandler={handleSelectItems} itemClickActionInput={"Checked"}/></div>
                            <br/>
                            <Button variant="primary" type="submit">
                                Start Auction
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>}
                    <br/>
                    {showSubmitError && errorMessageSubmit()}
                </div>
                <div className={"col"} >{}</div>
            </div>
        </div>

    );
}