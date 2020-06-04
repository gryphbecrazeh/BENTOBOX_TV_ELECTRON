import React, { useState } from "react";
import { Link } from "react-router-dom";
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
			<NavbarBrand>
				<Link to="/">Bentobox TV</Link>
			</NavbarBrand>
			<NavbarText>Stream Anime in peace</NavbarText>
			<NavbarToggler onClick={toggle} />
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
					<NavItem>
						<NavLink>
							<Link onClick={() => remote.getCurrentWindow().maximize()}>
								Max
							</Link>
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink>
							<Link onClick={() => remote.getCurrentWindow().close()}>
								Close
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default NavBar;
