import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useState} from "react";

export default function AdminPanel() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addItems(name, description);
    };

    const addItems = async (name, description) => {
        await fetch('http://localhost:8080/items', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                description: description,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <Card style={{ width: '22rem' }}>
            <Card.Body>
                <Card.Title>Add item</Card.Title>
                <Card.Text>

                </Card.Text>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Item name</Form.Label>
                    <Form.Control type="text" className="" value={name}
                                  onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Label>Item description</Form.Label>
                    <Form.Control type="text" className="" value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                    <Button variant="primary" type="submit">
                        Add item
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}