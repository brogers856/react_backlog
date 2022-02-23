import { useState } from "react";
import { OverlayTrigger, Button, Tooltip, Modal, Container, Row, Col, Table } from "react-bootstrap";
import { EditItemModal } from "..";

const Item = (props) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const openModal = () => {
        setShowInfo(false);
        setShowEdit(true);
    }

    const closeModal = () => {
        setShowEdit(false)
    }

    return (
        <>
            <div id={props.data._id} className="item d-flex flex-column align-items-center">
                <img className="image itemImage" src={props.data.imageThumb} />
                <div className="d-flex align-items-center mt-2">
                    <div className="num me-4">
                        {'#' + (props.pos + 1)}
                    </div>
                    <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-top`}>Item info</Tooltip>}>
                        <Button variant="primary" className="button itemButton infoButton mx-1" onClick={() => setShowInfo(true)}>
                            <div className="bi bi-info itemIcon icon"></div>
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-top`}>Delete item</Tooltip>}>
                        <Button variant="primary" className="button itemButton deleteButton" onClick={() => props.deleteHandler(props.data._id)}>
                            <div className="bi bi-trash itemIcon icon"></div>
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>

            <EditItemModal bid={props.bid} data={props.data} show={showEdit} closeModal={closeModal}/>

            <Modal size="lg" show={showInfo} onHide={() => setShowInfo(false)}>
                <Modal.Header>
                    <Container>
                        <Row>
                            <h2 className='infoTitle'>
                                {props.data.title}
                            </h2>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Container className="infoContainer">
                        <Row>
                            <Col lg={5} className="infoCol"> 
                                <img className="image infoImage" src={props.data.image}/>
                            </Col>
                            <Col lg={7}>
                                <div>
                                    <Table striped bordered size="md" variant="dark">
                                        <tbody>
                                            <tr>
                                                <th className="infoList">Release Date</th>
                                                <td>
                                                    <div key={props.data.date} className="d-block infoTag">
                                                        {props.data.date ? props.data.date 
                                                            : "None Listed"
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="infoList">Developers</th>
                                                <td>
                                                    <div className="infoTag">
                                                        {props.data.dev ? props.data.dev.map((dev) => { return <div key={dev} className="d-block infoTag">{dev}</div>; })
                                                            : "None Listed"
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Genres</th>
                                                <td>
                                                    <div className="infoTag">
                                                        {props.data.genres ? props.data.genres.map((genre) => { return <div key={genre} className="d-block infoTag">{genre}</div>; })
                                                            : "None Listed"
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Platforms</th>
                                                <td>
                                                    <div className="infoTag">
                                                        {props.data.platforms ? props.data.platforms.map((platform) => { return <div key={platform} className="d-block infoTag">{platform}</div>; })
                                                            : "None Listed"
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <p className=' infoDesc'>
                                {props.data.desc}
                            </p>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="btn-custom editButton" onClick={openModal}>Edit</Button>
                    <Button variant="primary" className="btn-custom" onClick={() => setShowInfo(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Item;