import { Navbar, Container } from "react-bootstrap"

const NavFooter = () => {
    return (
        <div className="mt-auto">
            <Navbar bg="dark">
                <Container className="align-items-center justify-content-center">
                    <p className="footer-text">Built with the <a className="footer-link" href="https://www.giantbomb.com/api/">GiantBomb API</a></p>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavFooter