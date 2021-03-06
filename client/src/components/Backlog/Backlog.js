import { Container, Row, Col, ButtonGroup, OverlayTrigger, Tooltip, Button, Modal} from 'react-bootstrap'
import { AddItemModal, ItemContainer } from '..';
import { useContext, useState } from 'react';
import React from 'react';
import { Loading, BacklogContext } from '..';

const Backlog = (props) => {
    const context = useContext(BacklogContext)
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteID] = useState();

    const deleteItem = async () => {
        context.deleteItem(props.id, deleteID);
        setShowDelete(false);
    }

    const deleteModal = (id) => {
        setDeleteID(id);
        setShowDelete(true);
    }

    const closeAddModal = () => {
        setShowAdd(false);
    }
    
    return (
        <>
            <Container id={props.id}>
                <Row className='justify-content-center'>
                    <Col lg='8' className='backlog firstBacklog px-0'>
                        <div className="labelHolder d-flex align-items-center px-2">
                            <span className="label">{props.name}</span>
                            <ButtonGroup className='backlog-buttons d-flex ms-auto'>
                                <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-top`}>Add item</Tooltip>}>
                                    <Button variant="primary" className="button backlogButton btn-custom addItem" onClick={() => setShowAdd(true)}>
                                        <div className="bi bi-plus-square backlogIcon icon"></div>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-top`}>Edit backlog</Tooltip>}>
                                    <Button variant="primary" className="button backlogButton btn-custom editBacklog" onClick={() => props.showEditHandler(props.id, props.name)}>
                                        <div className="bi bi-pencil-square backlogIcon icon"></div>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-top`}>Delete backlog</Tooltip>}>
                                    <Button variant="primary" className="button backlogButton btn-custom deleteBacklog" onClick={() => props.showDeleteHandler(props.id)}>
                                        <div className="bi bi-trash backlogIcon icon"></div>
                                    </Button>
                                </OverlayTrigger>
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
                <Row className='justify-content-center'>
                    <Col lg='8'>
                        <ItemContainer id={props.id} items={props.items} deleteHandler={deleteModal}/>
                    </Col>
                </Row>
            </Container>

            <AddItemModal id={props.id} show={showAdd} closeModal={closeAddModal} />

            <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
                <Modal.Body>
                    <p>Are you sure you want to delete this item? This cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>No</Button>
                    <Button variant="primary" className="btn-custom" onClick={deleteItem}>Yes</Button>
                </Modal.Footer>
            </Modal>

            {context.loading &&
                <Loading/>
            }
        </>
    )

}

export default Backlog;