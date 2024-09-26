import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages";
import GameSetup from "./pages/gamesetup";
import Game from "./pages/game";
import Locations from "./pages/locations";
import About from "./pages/about";

function App() {
	
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	
	return (
		<Router>
			<Header />
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/gamesetup" element={<GameSetup />} />
				<Route path="/game" element={<Game />} />
				<Route path="/locations" element={<Locations />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
