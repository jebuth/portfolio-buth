
import React from 'react';
import {Link} from '../../routes';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

import auth0 from '../../services/auth0';


const BsNavLink = (props) => {
	const {route, title} = props;

	return(
		<Link href={route}>
			<a className="nav-link port-navbar-link"> {title} </a>
		</Link>
	)
}

const LogIn = () => {
	return(
		<span onClick={auth0.login} className="nav-link port-navbar-link clickable">
			Login
		</span>

	)
} 

const LogOut = () => {
	return(
		<span className="nav-link port-navbar-link clickable">
			Logout
		</span>

	)
} 



export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  render() {
    return (
      <div>
        <Navbar className="port-navbar port-default absolute" color="transparent" dark expand="md">
          <NavbarBrand className="port-navbar-brand" href="/">Justin B</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              
              <NavItem className="port-navbar-item">
				<BsNavLink route="/" title="Home" />
              </NavItem>

              <NavItem className="port-navbar-item">
				<BsNavLink route="/about" title="About" />
              </NavItem>

              <NavItem className="port-navbar-item">
				<BsNavLink route="/portfolios" title="Portfolio" />
              </NavItem>

              <NavItem className="port-navbar-item">
				<BsNavLink route="/blogs" title="Blog" />
              </NavItem>

              <NavItem className="port-navbar-item">
				<BsNavLink route="/cv" title="Cv" />
              </NavItem>

              <NavItem className="port-navbar-item">
				      <LogIn />
					
              </NavItem>

              <NavItem className="port-navbar-item">
				<LogOut />
				
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}










