import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";
import {Alert} from "react-bootstrap";


export default function Login(){

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Error messages
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let loginCheck = false;

    const handleSubmit = (e) => {
        e.preventDefault();
        LoginUser(username, password);
        wait(500).then(() => {
            if(loginCheck){
                navigate("/");
            } else {
                setShowError(true)
                setErrorMessage("Incorrect login")
            }}
        );
    };


    const LoginUser = async (usernameInput, passwordInput) => {
        await fetch('http://localhost:8080/authentication', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => response.json())
            .then(response => {
                localStorage.setItem("authentication", response.jwtToken);
                loginCheck = true;
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const showErrorMessage = () => {
        return (
            <Alert variant="danger text-center">{errorMessage}</Alert>
        );
    };


    return (
        <div className={"row"}>
            <div className={"col"}></div>
            <div className={"col"}>
                <br/>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" className="" value={username}
                                          onChange={(e) => setUsername(e.target.value)}
                            />
                            <br/>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" className="" value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                            <br/>
                            <div className={"text-center"}>
                                <Button variant="primary"  type="submit">
                                    Log in
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
                <br/>
                {showError && showErrorMessage()}
            </div>
            <div className={"col"}></div>
        </div>

    );
}


