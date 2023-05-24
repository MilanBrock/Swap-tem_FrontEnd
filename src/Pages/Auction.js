import * as React from 'react';
import {useEffect, useState} from "react";
import useWebSocket from 'react-use-websocket';
import SockJsClient from 'react-stomp';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSearchParams, useParams } from "react-router-dom";
import ItemCatalog from "../RenderComponents/Inventory/ItemCatalog";




export default function Auction() {

    const params = useParams();

    // Async communication
    const [currentOffer, setCurrentOffer] = useState("");
    // Info about the auction
    const [auctionId, setAuctionId] = useState(params.auctionId);
    const [ownerId, setOwnerId] = useState();
    const [ownerName, setOwnerName] = useState();
    const [ownerItemIds, setOwnerItemIds] = useState([]);
    const [ownerItems, setOwnerItems] = useState([]);
    const [minimalOffer, setMinimalOffer] = useState();
    // Info about the user
    const [participantId, setParticipantId] = useState(params.participantId);
    const [offerAmount, setOfferAmount] = useState("");


    const WS_URL = 'http://localhost:9090/ws-message';


    useEffect(() => {
        //Get auction info
        fetch('http://localhost:9090/auctions/' + params.auctionId)
            .then((response) => response.json())
            .then((data) => {
                setOwnerId(data.ownerId);
                setOwnerItemIds(data.ownerItems);
                setMinimalOffer(data.minimalOffer);
                setCurrentOffer(data.currentOffer)
            }).catch((err) => {
            console.log(err.message);
        });
    }, []);


    // Get item info from inventory management back end
    useEffect(() => {
        fetch('http://localhost:8080/items/itemCollection', {
            method: 'POST',
            body: JSON.stringify({
                itemIds: ownerItemIds,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setOwnerItems(data.items);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [ownerItemIds]);


    // Get owner name
    useEffect(() => {
        //Get auction info
        fetch('http://localhost:8080/users/' + ownerId)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOwnerName(data.username)
            }).catch((err) => {
            console.log(err.message);
        });
    }, [ownerId]);


    // Update offer when new is available
    const onMessageReceived = (msg) => {
        setCurrentOffer(msg.message)
    }


    // Post a new offer to the auction back end
    const updateOffer = async (auctionId, participantId, offerAmount) => {
        await fetch('http://localhost:9090/auctions/offer', {
            method: 'POST',
            body: JSON.stringify({
                auctionId: auctionId,
                participantId: participantId,
                offerAmount: offerAmount
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };


    // Send the request to the auction back end
    const handleSubmit = (e) => {
        e.preventDefault();
        updateOffer(auctionId,participantId,offerAmount);
    };


    return(
        <div>
            <SockJsClient
                url={WS_URL}
                topics={['/topic/message']}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />

            <div className={"row"}>
                <div className={"col"} style={{marginLeft:"9%"}}>
                    <h1>{ownerName}'s Auction</h1>
                    <br/>
                    <label>Auction items</label>
                    <ItemCatalog items={ownerItems} itemClickActionInput={"Inspect"}/>
                </div>
                <div className={"col"}>
                    <h1>Current offer:</h1>
                    <h1>{currentOffer}</h1>
                    <Card style={{ width: '22rem' }}>
                        <Card.Body>
                            <Card.Title>Submit offer</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Label>Minimum offer: {minimalOffer}</Form.Label>
                                <Form.Control type="text" onChange={(e) => setOfferAmount(e.target.value)}/>
                                <Button variant="primary" type="submit">
                                    Send offer
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>






        </div>
    );
}
