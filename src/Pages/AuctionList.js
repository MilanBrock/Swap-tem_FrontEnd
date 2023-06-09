import * as React from 'react';
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import AuctionCatalog from "../RenderComponents/Auctions/AuctionCatalog";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Alert} from "react-bootstrap";
import {wait} from "@testing-library/user-event/dist/utils";

export default function AuctionList() {
    const navigate = useNavigate();
    const params = useParams();
    const [auctions, setAuctions] = useState([]);

    let joinedAuction = false;
    const [showError, setShowError] = useState(false);
    const [showLoadError, setShowLoadError] = useState(false);




    // Get all active auctions from the auction back end
    useEffect(() => {
        fetch('http://localhost:9090/auctions')
            .then((response) => response.json())
            .then((data) => {
                setAuctions(data);
            }).catch((err) => {
            console.log(err.message);
            setShowLoadError(true);
        });

    }, []);


    const joinAuction = async (auctionId) => {
        await fetch('http://localhost:9090/auctions/join/' + auctionId, {
            method: 'PUT',
            headers: {
                "authentication": localStorage.getItem("authentication"),
            }
        })
            .then((response) => response.text())
            .then((data) => {
                if(data === "Auction joined"){
                    joinedAuction = true;
                }

            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleJoinAuction = (auctionId) => {
        joinAuction(auctionId)
        wait(500).then(() => {
            if(joinedAuction){
                navigate("/auction/" + auctionId);
            } else {
                setShowError(true)
            }}
        );


    };


    return(
        <div>
            <br/>
            <div className={"row"}>
                <div className={"col"} ></div>
                <div className={"col"} >
                    {showError && <Alert variant="danger text-center">Unable to join auction</Alert> ||
                    showLoadError && <Alert variant="danger text-center">Unable to load auctions</Alert>}
                    <h1></h1>
                    <AuctionCatalog auctions={auctions} handleJoinAuction={handleJoinAuction}/>
                </div>
                <div className={"col"} >{<Button variant={"primary"} style={{width:"80px", marginLeft:"9%"}} ><Link style={{color:"white"}} to={"/auctionStart/"} >Start Auction</Link></Button>}</div>
            </div>
        </div>
    );
}
