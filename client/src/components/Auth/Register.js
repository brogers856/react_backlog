import { Container, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "..";
import { useNavigate } from "react-router";

const Register = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        context.register(data)
    }

    return (
        <Container className="register-form">
            <Form id="registerForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="username" required placeholder="Username"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" name="password" required placeholder="Password"/>
                </Form.Group>
                <div className="d-flex">
                    <Button form="registerForm" type="submit" variant="primary" className="btn-custom">Register</Button>
                    <Button variant="primary" className="btn-custom ms-4" onClick={() => {navigate("/")}}>Go Back</Button>
                </div>
            </Form>
        </Container>
    )
}

export default Register;