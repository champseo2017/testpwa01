import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


const MenubarL = (props) => {

  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen)
  }

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <div className="container">
          <Link href="/">
            <a className="nav-link">React GoGo</a>
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link href="/">
                  <a className="nav-link">Home</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/user">
                  <a className="nav-link">Photo</a>
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </React.Fragment>
  );
}

export default MenubarL