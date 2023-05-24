import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import NavigationBar from "./RenderComponents/NavigationBar/NavigationBar";

import Home from './Pages/Home'
import Inventory from './Pages/Inventory'
import AdminPanel from "./Pages/AdminPanel";
import {Route, Routes} from "react-router-dom";
import AuctionList from "./Pages/AuctionList";
import AuctionStart from "./Pages/AuctionStart";
import Auction from "./Pages/Auction";


function App() {

  return (
      <div>
          <NavigationBar/>
          <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/inventory/:userId" element={<Inventory />} />
              <Route path="/auctionlist/:userId" element={<AuctionList/>} />
              <Route path="/auctionstart/:userId" element={<AuctionStart/>} />
              <Route path="/auction/:auctionId/:participantId" element={<Auction/>} />
              <Route path="/admin" element={<AdminPanel />} />
          </Routes>
      </div>
  );
}

export default App;
