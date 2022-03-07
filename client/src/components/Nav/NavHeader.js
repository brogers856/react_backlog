import { Container, NavbarBrand, Nav, Navbar, NavLink } from "react-bootstrap"
import { Outlet } from "react-router";

    
const NavHeader = () => {
    return (
        <>
            <Navbar id='mainNavbar' bg="dark" expand="lg" fixed="top">
                <Container fluid className="mx-0">
                    <NavbarBrand href="#">Backlog</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                            <NavLink href="https://github.com/brogers856/react_backlog">
                                <i className="bi bi-github me-1"/>
                                Github
                            </NavLink>
                        <NavLink href="#help">Help</NavLink>
                        <NavLink href="#register">Register</NavLink>
                        <NavLink href="#login">Log In</NavLink>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet/>
        </>
        )
}
    
export default NavHeader;