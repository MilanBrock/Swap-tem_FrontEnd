import logo from './logo.svg';
import './App.css';
import React, {useState} from "react";
import NavigationBar from "./RenderComponents/NavigationBar/NavigationBar";

import Home from './Pages/Home'
import Login from './Pages/Login'
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
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/auctionlist" element={<AuctionList/>} />
              <Route path="/auctionstart" element={<AuctionStart/>} />
              <Route path="/auction/:auctionId" element={<Auction/>} />
              <Route path="/admin" element={<AdminPanel />} />
          </Routes>
      </div>
  );
}

export default App;
