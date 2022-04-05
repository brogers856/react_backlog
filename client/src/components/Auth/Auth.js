import { Button, Container, Row, Col } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'

const Auth = () => {
    let navigate = useNavigate();

    return (
        <Container fluid className="auth-container">
            <Row className="auth-row">
                <Col lg={4}></Col>
                <Col lg={2} className="d-flex justify-content-center">
                    <Button variant="primary" className="btn-custom"  size="lg" onClick={() => {navigate("/login")}}>Log In</Button>
                </Col>
                <Col lg={2} className="d-flex justify-content-center">
                    <Button variant="primary" className="btn-custom"  size="lg" onClick={() => {navigate("/register")}}>Register</Button>
                </Col>
                <Col lg={4}></Col>
            </Row>
        </Container>
    )
}

export default Auth