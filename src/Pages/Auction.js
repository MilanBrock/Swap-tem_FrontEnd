import * as React from 'react';
import {useEffect, useState} from "react";
import useWebSocket from 'react-use-websocket';
import SockJsClient from 'react-stomp';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useSearchParams, useParams, useNavigate} from "react-router-dom";
import ItemCatalog from "../RenderComponents/Inventory/ItemCatalog";
import {Alert} from "react-bootstrap";
import {wait} from "@testing-library/user-event/dist/utils";




export default function Auction() {
    const navigate = useNavigate();
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
    const [offerAmount, setOfferAmount] = useState("");

    // Error messages
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Leaving auction
    let auctionLeave = false;


    const WS_URL = 'http://localhost:9090/ws-message';


    useEffect(() => {
        //Get auction info
        fetch('http://localhost:9090/auctions/' + params.auctionId, {
            headers: {
                "authentication": localStorage.getItem("authentication"),
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setOwnerId(data.ownerId);
                setOwnerItemIds(data.ownerItems);
                setMinimalOffer(data.minimalOffer);
                setCurrentOffer(data.currentOffer)
            }).catch((err) => {
                setShowError(true);
                setErrorMessage("Could not load auction info");
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
                "authentication": localStorage.getItem("authentication"),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setOwnerItems(data.items);
            })
            .catch((err) => {
                console.log(err.message);
                setShowError(true);
                setErrorMessage("Could not load auction items");
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
            setShowError(true);
            setErrorMessage("Could not load owner information");
        });
    }, [ownerId]);


    // Update offer when new is available
    const onMessageReceived = (msg) => {
        setCurrentOffer(msg.message)
    }


    // Post a new offer to the auction back end
    const updateOffer = async (auctionId, offerAmount) => {
        await fetch('http://localhost:9090/auctions/offer', {
            method: 'POST',
            body: JSON.stringify({
                auctionId: auctionId,
                offerAmount: offerAmount
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "authentication": localStorage.getItem("authentication"),
            },
        })
            .then((response) => response.text())
            .then((data) => {
                if(data === "Invalid offer"){
                    setShowError(true);
                    setErrorMessage("Offer not accepted");
                }
            })
            .catch((err) => {
                console.log(err.message);

            });
    };


    // Send the request to the auction back end
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowError(false);
        updateOffer(auctionId,offerAmount);
    };


    const leaveAuction = async (auctionId) => {
        await fetch('http://localhost:9090/auctions/leave/' + auctionId, {
            method: 'PUT',
            body: JSON.stringify({
                auctionId: auctionId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "authentication": localStorage.getItem("authentication"),
            },
        })
            .then((response) => response.text())
            .then((data) => {
                if(data === "Left auction"){
                    auctionLeave = true;
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleLeaveAuction = (e) => {
        e.preventDefault();
        leaveAuction(auctionId);
        wait(500).then(() => {
            if(auctionLeave){
                navigate("/auctionList");
            } else {
                setShowError(true)
                setErrorMessage("Unable to leave auction")
            }}
        );
    }

    const showErrorMessage = () => {
        return (
            <Alert variant="danger text-center">{errorMessage}</Alert>
        );
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
                <div className={"col"}><Button onClick={handleLeaveAuction} variant={"danger"} style={{marginLeft:"28%", marginTop:"2%"}}>Leave auction</Button></div>
                <div className={"col"}>{showError && showErrorMessage()}</div>
                <div className={"col"}></div>

            </div>

            <div className={"row"}>
                <br/>
                <div className={"col"} style={{marginLeft:"9%", marginTop:"2%"}}>
                    <h1>{ownerName}'s Auction</h1>
                    <br/>
                    <h4>Auction items</h4>
                    <div style={{marginLeft:"12px"}}>
                        <ItemCatalog items={ownerItems} itemClickActionInput={"Inspect"}/>
                    </div>

                </div>
                <div className={"col"}  style={{marginTop:"2%"}}>
                    <div className={"text-center"}>
                        <h1 >Current offer:</h1>
                        <h1 >{currentOffer}</h1>
                        <br/>
                        <Card style={{marginLeft:"auto", marginRight:"auto", width:"50%"}}>
                            <Card.Body>
                                <Card.Title>Submit offer</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Label>Minimum offer: {minimalOffer}</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setOfferAmount(e.target.value)}/>
                                    <br/>
                                    <div className={"text-center"}>
                                        <Button variant="primary" type="submit">
                                            Send offer
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
