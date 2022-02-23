import { Container, Row, Col, Spinner, Modal } from 'react-bootstrap'

const Loading = () => {

    return (
        <Modal show={true}>
            <Modal.Body>
                <Container className='d-flex flex-column justify-content-center align-items-center'>
                    <Row>
                        <Col>
                            <Spinner animation="border" role="status">
                            </Spinner>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <span>Loading...</span>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default Loading;