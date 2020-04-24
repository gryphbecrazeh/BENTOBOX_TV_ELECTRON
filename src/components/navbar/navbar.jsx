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
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<Navbar color="dark" dark expand="md">
			<NavbarBrand>
				<Link to="/">Bentobox TV</Link>
			</NavbarBrand>
			<NavbarText>Stream Anime with a Proxy</NavbarText>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav navbar>
					<NavItem>
						<NavLink>
							<Link to="/catalog">Catalog</Link>
						</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default NavBar;
