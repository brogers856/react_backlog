import { Container, Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import { useContext } from 'react';
import { BacklogContext } from '..';

const NewBacklogButton = () => {
  const context = useContext(BacklogContext);
  
    return (
      <Container className="mt-5 d-flex justify-content-center align-items-center" id='newButtonContainer'>
        <Row>
          <Col>
            <Button className="button backlogButton newBacklogButton" onClick={() => context.addBacklog()}>
              <div className="bi bi-plus-square newBacklogIcon icon"></div>
            </Button>
          </Col>
        </Row>
      </Container>
    )
}

export default NewBacklogButton;