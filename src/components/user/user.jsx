// React
import React, { useState, useEffect } from "react";
import Store from "../../data/store";
import { Input } from "reactstrap";

let User = () => {
	let [user, setUser] = useState({});
	let [loggedIn, setLoggedIn] = useState(false);
	let [error, setError] = useState(null);
	let [form, setForm] = useState({
		username: null,
		email: null,
		password: null,
		confirmPassword: null,
	});
	let [displayPassword, setDisplayPassword] = useState(false);
	useEffect(() => {
		let store = new Store({
			configName: "user-data",
			defaults: {
				user: {
					username: null,
					email: null,
					watchLater: [],
					watchHistory: [],
					favorites: [],
					watchingList: [],
					lastLoggedIn: null,
				},
			},
		});
		let storedUser = store.get("user");
		let { username, email, lastLoggedIn } = storedUser;
		if (loggedIn && (!username || !email || !lastLoggedIn)) {
			setError("User currently not logged in...");
			return setLoggedIn(false);
		}
	});
	let updateForm = (e) => {
		let { name, value } = e.target;
		let updatedForm = form;
		updatedForm[name] = value;
		setForm(updatedForm);
	};
	let DisplayWarning = () => {
		if (!error) {
			return null;
		}
		return <div>Error: {`${error}`}</div>;
	};
	let RegisterForm = () => {
		return (
			<div>
				<Input
					type="text"
					name="username"
					onChange={updateForm}
					placeholder="Username"
				/>
				<Input
					type="email"
					name="email"
					onChange={updateForm}
					placeholder="Email"
				/>
				<Input
					type={displayPassword ? "text" : "password"}
					name="password"
					onChange={updateForm}
					placeholder="Password"
				/>
				<Input
					type={displayPassword ? "text" : "password"}
					name="confirmPassword"
					onChange={updateForm}
					placeholder="Confirm Password"
				/>
			</div>
		);
	};
	let LoginForm = () => {
		return (
			<div>
				<Input
					type="text"
					name="username"
					onChange={updateForm}
					placeholder="Username"
				/>
				<Input
					type={displayPassword ? "text" : "password"}
					name="password"
					onChange={updateForm}
					placeholder="Password"
				/>
			</div>
		);
	};
	return (
		<div>
			<DisplayWarning />
			<RegisterForm />
		</div>
	);
};
export default User;
