import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Catallog from "./components/catalog/catalog";
import Dashboard from "./components/dashboard/dashboard";
import getUpdates from "./inc/getUpdates";

function App() {
	console.log(window);
	getUpdates();
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<NavBar />
				</header>
				<Switch>
					<Route exact path="/catalog" component={Catallog}></Route>
					<Route exact path="/" component={Dashboard} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
