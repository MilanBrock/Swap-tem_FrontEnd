import * as React from 'react';
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import AuctionCatalog from "../RenderComponents/Auctions/AuctionCatalog";
import {Link, useNavigate, useParams} from "react-router-dom";



export default function AuctionList() {
    const navigate = useNavigate();
    const params = useParams();
    const [auctions, setAuctions] = useState([]);

    // Get all active auctions from the auction back end
    useEffect(() => {
        fetch('http://localhost:9090/auctions')
            .then((response) => response.json())
            .then((data) => {
                setAuctions(data);
            }).catch((err) => {
            console.log(err.message);
        });

    }, []);


    const joinAuction = async (auctionId, userId) => {
        await fetch('http://localhost:9090/auctions/join/' + auctionId + "/" + userId, {
            method: 'PUT',
        })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleJoinAuction = (auctionId) => {
        joinAuction(auctionId, params.userId)
        navigate("/auction/" + auctionId + "/" + params.userId);
    };


    return(
        <div>
            <br/>
            <div className={"row"}>
                <div className={"col"} ></div>
                <div className={"col"} >
                    <h1></h1>
                    <AuctionCatalog auctions={auctions} handleJoinAuction={handleJoinAuction}/>
                </div>
                <div className={"col"} >{<Button variant={"primary"} style={{width:"80px", marginLeft:"9%"}} ><Link style={{color:"white"}} to={"/auctionStart/" + params.userId} >Start Auction</Link></Button>}</div>
            </div>
        </div>
    );
}
