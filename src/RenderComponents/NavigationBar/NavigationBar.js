import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect, useState} from "react";

export default function NavigationBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.clear()
        setIsLoggedIn(false)
    };


    useEffect(() => {
        if(localStorage.getItem("authentication") != null){
            setIsLoggedIn(true)
        }
    }, [localStorage.getItem("authentication")]);


    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Swap-tem</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/inventory">Inventory</Nav.Link>
                        <Nav.Link href="/auctionList">Auctions</Nav.Link>
                        <Nav.Link href="/admin">Admin panel (secret)</Nav.Link>
                    </Nav>
                    <Nav className="m-lg-auto">
                        {!isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>
                            || <Nav.Link onClick={handleSubmit}>Log out</Nav.Link>}
                    </Nav>
                </Container>
            </Navbar>
    );
}

