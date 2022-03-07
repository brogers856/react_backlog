import { useContext, useState } from "react";
import { Button, Modal, Form, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap"
import { BacklogContext } from "..";

const AddItemModal = (props) => {
    const context = useContext(BacklogContext)
    const [resultMode, setResultMode] = useState(false);
    const [manualMode, setManualMode] = useState(false);
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData(e.target),
        formDataObj = Object.fromEntries(data.entries())
        const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/search", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: formDataObj.searchInput })
        })
        let body = await res.json();
        let arr = []
        for (const item of body) {
            arr.push(<ListGroupItem action onClick={() => handleClick(item.guid)} key={item.guid} id={item.guid}>{item.name}</ListGroupItem>)
        }
        setResults(arr);
        setResultMode(true);
    }

    const handleManualSubmit = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        for (var value of data.values()) {
            console.log(value);
         }
        context.addItemManual(data, props.id)
        closeModal();
    }
    
    const handleClick = (guid) => {
        context.addItemApi(guid, props.id);
        closeModal();
    }

    const closeModal = () => {
        setResults([]);
        setResultMode(false);
        setManualMode(false);
        props.closeModal();
    }

    return (
        <Modal show={props.show} onHide={() => props.closeModal()} centered>
            <Modal.Body>
                {manualMode ? (
                    <Form id="manual-submit" onSubmit={handleManualSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Game Title:</Form.Label>
                            <Form.Control type="text" name="title" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Game Developer:</Form.Label>
                            <Form.Control type="text" name="dev" />
                            <p className="mb-0">Enter multiple genres seperated by commas</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Release Year:</Form.Label>
                            <Form.Control type="date" name="date"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Genres:</Form.Label>
                            <Form.Control type="text" name="genres"/>
                            <p className="mb-0">Enter multiple genres seperated by commas</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Platforms:</Form.Label>
                            <Form.Control type="text" name="platforms"/>
                            <p className="mb-0">Enter multiple platforms seperated by commas</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" cols={30} rows={5} name="desc"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Upload an image (jpg, jpeg, or png):</Form.Label>
                            <Form.Control type="file" name="file"/>
                        </Form.Group>
                    </Form>
                ) : (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="gameSearch">
                                <InputGroup>
                                    <InputGroup.Text><i className="bi bi-search"/></InputGroup.Text>
                                    <Form.Control type="text" name="searchInput" placeholder="Search for a game" />
                                    <Button type="submit" variant="primary" className="btn-custom">Search</Button>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                        {resultMode &&
                            <>
                                <ListGroup>
                                    {results.length == 0 &&
                                        <p>Sorry, no results!</p>
                                    }
                                    {results}
                                </ListGroup>
                            </>
                        }
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                {manualMode ? (
                    <>
                        <div className="d-flex align-items-center justify-content-center me-auto">
                            <Button variant="secondary" className="btn-custom new-manual" onClick={() => setManualMode(false)}>Back to search</Button>
                        </div>
                        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                        <Button form="manual-submit" type="submit" variant="primary" className="btn-custom">Add game</Button>
                    </>
                ): (
                    <>
                        <div className="d-flex align-items-center justify-content-center me-auto">
                            <span className='mb-0 me-2'>Game not listed?</span>
                            <Button variant="secondary" className="btn-custom new-manual" onClick={() => setManualMode(true)}>Add game manually</Button>
                        </div>
                        <Button variant="secondary" onClick={closeModal}>Close</Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default AddItemModal