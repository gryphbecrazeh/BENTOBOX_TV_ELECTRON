import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import Catallog from "./components/catalog/catalog";
function App() {
	console.log(window);
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<NavBar />
				</header>
				<Switch>
					<Route exact path="/catalog" component={Catallog}></Route>
					<Route exact path="/">
						Home
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
