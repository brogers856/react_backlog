import { Card, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <Container className='container-404'>
            <Row>
                <Col>
                    <Card className='card-404'>
                        <Card.Body>
                            <Card.Title>404 Not Found</Card.Title>
                            <Card.Text>
                                Sorry, the page you requested doesn't exist
                            </Card.Text>
                            <Card.Link onClick={() => {navigate("/")}}>Go back home</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound;