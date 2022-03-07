import { useContext } from "react";
import { Container, Modal, Form, Button } from "react-bootstrap";
import { BacklogContext } from "..";


const EditItemModal = (props) => {
    const context = useContext(BacklogContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        context.editItem(data, props.bid, props.data._id)
        props.closeModal()
    }

    return (
        <Modal show={props.show} onHide={props.setShow} onSubmit={handleSubmit} centered>
            <Modal.Body>
                <Container>
                    <Form id="edit-item">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Game Title:</Form.Label>
                            <Form.Control type="text" name="title" required defaultValue={props.data.title}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Game Developer:</Form.Label>
                            <Form.Control type="text" name="dev" defaultValue={props.data.dev} />
                            <p className="mb-0">Enter multiple developers seperated by commas</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Release Year:</Form.Label>
                            <Form.Control type="date" name="date" defaultValue={props.data.date}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Genres:</Form.Label>
                            <Form.Control type="text" name="genres" defaultValue={props.data.genres}/>
                            <p className="mb-0">Enter multiple genres seperated by commas</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Platforms:</Form.Label>
                            <Form.Control type="text" name="platforms" defaultValue={props.data.platforms}/>
                            <p className="mb-0">Enter multiple platforms seperated by commas</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" cols={30} rows={5} name="desc" defaultValue={props.data.desc}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Upload an image (jpg, jpeg, or png):</Form.Label>
                            <Form.Control type="file" name="file" />
                            <Form.Label className="mt-1">(Leave empty to keep old image)</Form.Label>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>Cancel</Button>
                <Button form="edit-item" type="submit" variant="primary" className="btn-custom">Update</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditItemModal;