import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Catalog from "./components/catalog/catalog";
import Episode from "./components/episode/episode";
import Dashboard from "./components/dashboard/dashboard";
import getUpdates from "./inc/getUpdates";

function App() {
	getUpdates();
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<NavBar />
				</header>
				<Switch>
					<Route path="/e/:show/:episode" component={Episode} />
					<Route exact path="/catalog" component={Catalog}></Route>
					<Route exact path="/" component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
