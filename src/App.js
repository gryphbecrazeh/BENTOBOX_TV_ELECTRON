import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Catalog from "./components/catalog/catalog";
import Episode from "./components/episode/episode";
import Dashboard from "./components/dashboard/dashboard";
import getUpdates from "./inc/getUpdates";

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
					<Route exact path="/catalog" component={Catalog}></Route>
					<Route path="/" component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
