import { Container, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "..";
import { useNavigate } from "react-router";

const Login = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        context.login(data)
    }

    return (
        <Container className="login-form">
            <Form id="loginForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" name="username" required placeholder="Username"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" name="password" required placeholder="Password"/>
                </Form.Group>
                <div className="d-flex">
                    <Button form="loginForm" type="submit" variant="primary" className="btn-custom">Login</Button>
                    <Button variant="primary" className="btn-custom ms-4" onClick={() => {navigate("/")}}>Go Back</Button>
                </div>
            </Form>
        </Container>
    )
}

export default Login;