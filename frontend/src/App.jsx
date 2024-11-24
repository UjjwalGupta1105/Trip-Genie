import { useState } from 'react'
import {BrowserRouter ,Routes,Route } from 'react-router-dom';
import './App.css'
import Home from "./components/pages/Home"
import CreateTrip from './components/pages/CreateTrip';
import LoginSignup from './components/pages/LoginSignup';
import MyProfile from './components/pages/UserProfile';
import ViewTrip from './components/pages/Viewtrip';
import MyTrips from './components/pages/MyTrips';

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route  path="/create-trip" element={<CreateTrip/>}/>
            <Route  path="/register" element={<LoginSignup/>}/>
            <Route  path="/account" element={<MyProfile/>}/>
            <Route  path="/my-trips" element={<MyTrips/>}/>
            <Route  path="/view-trip/:tripId" element={<ViewTrip/>}/>
          </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
