import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	FaTimesCircle,
	FaWindowMaximize,
	FaWindowRestore,
	FaWindowMinimize,
} from "react-icons/fa";

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	NavbarText,
} from "reactstrap";

let NavBar = () => {
	const electron = window.require("electron");
	const remote = electron.remote;
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar expand="md">
			{/* <NavbarText>Stream Anime in peace</NavbarText> */}
			<NavbarToggler onClick={toggle} />
			<NavbarBrand>
				<Link to="/">Bentobox TV</Link>
			</NavbarBrand>

			<Nav>
				<div className="window-controls">
					<NavItem>
						<NavLink>
							<Link onClick={() => remote.getCurrentWindow().minimize()}>
								<FaWindowMinimize />
							</Link>
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink>
							<Link
								onClick={() => {
									let {
										isMaximized,
										restore,
										maximize,
									} = remote.getCurrentWindow();
									return isMaximized() ? restore() : maximize();
								}}
							>
								<FaWindowMaximize />
							</Link>
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink>
							<Link onClick={() => remote.getCurrentWindow().close()}>
								<FaTimesCircle />
							</Link>
						</NavLink>
					</NavItem>
				</div>
			</Nav>
			<Collapse isOpen={isOpen} navbar>
				<Nav navbar>
					<NavItem>
						<NavLink>
							<Link to="/catalog">Catalog</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/user">Login / Register</Link>
						</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default NavBar;
