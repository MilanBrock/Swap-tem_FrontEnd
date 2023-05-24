import React, {useEffect, useState} from "react";
import RenderAuction from "./RenderAuction";

export default function AuctionCatalog({auctions, handleJoinAuction}){

    const rows = [];

    for (let i = 0; i < auctions.length; i += 3) {
        rows.push(
            <div className="row" key={i}>
                {auctions.slice(i, i + 3).map((auction) => (
                    <div className="auctionRows" key={auction.auctionId}>
                        <RenderAuction auctionId={auction.auctionId} handleJoinAuction={handleJoinAuction} />
                    </div>
                ))}
            </div>
        );
    }

    return <div>
        <br/>
        <div className={"row"}>
            <div className={"col"} ></div>
            <div className={"col"} >{rows}</div>
            <div className={"col"} ></div>
        </div>
    </div>;
}

