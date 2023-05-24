import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";


const RenderAuction = ({auctionId, handleJoinAuction}) => {

    const handleClick = (e) => {
        handleJoinAuction(auctionId)
    }


    return(
        <div>
            <Card style={{ width: '35rem' }}>
                <Card.Body>
                    <Card.Title>AUCTION</Card.Title>
                    <Form.Label></Form.Label>
                    <Button variant="primary" onClick={handleClick}>Join Auction</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RenderAuction