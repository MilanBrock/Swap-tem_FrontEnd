import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as React from "react";
import {useState} from "react";


const RenderItem = ({itemName, itemDescription}) => {


    return(
        <div>
            <Card style={{ width: '22rem' }}>
                <Card.Body>
                    <Card.Title>{itemName}</Card.Title>
                    <Form.Label>{itemDescription}</Form.Label>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RenderItem;