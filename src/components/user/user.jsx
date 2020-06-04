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
	let expandForm = (form) => {
		let layers = [...document.querySelectorAll(".layer")];
		let layer = document.querySelector(`.${form}`);
		let topLayer = document.querySelector(".skewed .top");
		let next = form !== "top" ? 0 : 1;
		let contentBody = layers[next].querySelector(".content-body");
		let layerForm = layer.querySelector("form");
		let underline = layer.querySelector(".underline");
		underline.style.width = "100%";
		contentBody.style.opacity = 0;
		if (!next) {
			topLayer.style.width = "calc(30vw + 1000px)";
		} else {
			topLayer.style.width = "calc(85vw + 1000px)";
		}
		layerForm.style.opacity = 1;
	};
	let contractForm = () => {
		let topLayer = document.querySelector(".skewed .top");
		let layers = [...document.querySelectorAll(".layer")];
		let underlines = [...document.querySelectorAll(".underline")];
		let forms = [...document.querySelectorAll("form")];

		topLayer.style.marginLeft = "-1000px";
		topLayer.style.width = "calc(50vw + 1000px)";
		underlines.forEach((item) => (item.getElementsByClassName.width = "0"));
		layers.forEach((layer) => {
			let contentBody = layer.querySelector(".content-body");
			contentBody.style.opacity = "1";
		});
		forms.forEach((form) => {
			form.style.opacity = "0";
		});
	};
	let DisplayWarning = () => {
		if (!error) {
			return null;
		}
		return <div>Error: {`${error}`}</div>;
	};
	let RegisterForm = () => {
		return (
			<div
				className="layer top"
				onMouseEnter={() => expandForm("top")}
				onMouseLeave={contractForm}
			>
				<div className="content-wrap">
					<div className="content-body">
						<div className="title">
							REGISTER<span className="underline"></span>
						</div>
						<form>
							<div className="hilight-text">Joooooiiiiin Uuuuusssss!</div>

							<input
								type="text"
								name="username"
								onChange={updateForm}
								placeholder="Username"
							/>
							<input
								type="email"
								name="email"
								onChange={updateForm}
								placeholder="Email"
							/>
							<input
								type={displayPassword ? "text" : "password"}
								name="password"
								onChange={updateForm}
								placeholder="Password"
							/>
							<input
								type={displayPassword ? "text" : "password"}
								name="confirmPassword"
								onChange={updateForm}
								placeholder="Confirm Password"
							/>
							<div class="button register">Register</div>
						</form>
					</div>
				</div>
			</div>
		);
	};
	let LoginForm = () => {
		return (
			<div
				className="layer bottom"
				onMouseEnter={() => expandForm("bottom")}
				onMouseLeave={contractForm}
			>
				<div className="content-wrap">
					<div className="content-body">
						<div className="title">
							LOGIN<span className="underline"></span>
						</div>
						<form>
							<div className="hilight-text">Welcome back!</div>

							<input
								type="text"
								name="username"
								onChange={updateForm}
								placeholder="Username"
							/>
							<input
								type={displayPassword ? "text" : "password"}
								name="password"
								onChange={updateForm}
								placeholder="Password"
							/>
							<div class="button login">Login</div>
						</form>
					</div>
				</div>
			</div>
		);
	};
	return (
		<div id="wrapper" className="skewed">
			{/* <DisplayWarning /> */}

			<RegisterForm />
			<LoginForm />
		</div>
	);
};
export default User;
