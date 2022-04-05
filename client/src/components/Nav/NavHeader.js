import { useContext } from "react";
import { Container, NavbarBrand, Nav, Navbar, NavLink } from "react-bootstrap"
import { Outlet } from "react-router";
import { UserContext } from "..";
import { useNavigate } from "react-router";

const NavHeader = () => {
    const context = useContext(UserContext)
    let navigate = useNavigate()
    return (
        <>
            <Navbar id='mainNavbar' bg="dark" expand="lg" fixed="top">
                <Container fluid className="mx-0">
                    <NavbarBrand onClick={() => {navigate("/")}}>Backlog</NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink href="https://github.com/brogers856/react_backlog">
                                <i className="bi bi-github me-1" />
                                Github
                            </NavLink>
                            <NavLink href="/help">Help</NavLink>
                            {context.state
                                ? <NavLink onClick={context.logout}>Log Out</NavLink>
                                : <>
                                    <NavLink onClick={() => {navigate("/register")}}>Register</NavLink>
                                    <NavLink onClick={() => {navigate("/login")}}>Log In</NavLink>
                                </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}

export default NavHeader;