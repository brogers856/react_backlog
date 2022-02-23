import { Card, Container, Row, Col } from 'react-bootstrap'

const NotFound = () => {
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
                            <Card.Link href="/">Go back home</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound;