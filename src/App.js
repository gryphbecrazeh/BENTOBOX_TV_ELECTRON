// React
import React, { useState } from "react";
// Sass
import "./App.scss";
// React Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Utilities
import getUpdates from "./inc/getUpdates";

// Components
import NavBar from "./components/navbar/navbar";

// Pages
import Catalog from "./components/catalog/catalog";
import Episode from "./components/episode/episode";
import Dashboard from "./components/dashboard/dashboard";
import User from "./components/user/user";

function App() {
	const [loaded, setLoaded] = useState(false);
	if (!loaded) {
		console.log("loading updates");
		getUpdates();
		setLoaded(true);
	}
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<NavBar />
				</header>
				<Switch>
					<Route exact path="/e/:show/:episode" component={Episode} />
					<Route exact path="/catalog" component={Catalog} />
					<Route exact path="/user" component={User} />
					<Route path="/" component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
