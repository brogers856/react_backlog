import { useContext, useEffect, useState } from "react";
import { Container, Modal, Form, Button, InputGroup } from "react-bootstrap";
import { BacklogContext, TagItem } from "..";


const EditItemModal = (props) => {
    const context = useContext(BacklogContext);
    const [genreInput, setGenreInput] = useState("")
    const [genres, setGenres] = useState([])
    const [platformInput, setPlatformInput] = useState("")
    const [platforms, setPlatforms] = useState([])
    const [devInput, setDevInput] = useState("")
    const [devs, setDevs] = useState([])

    useEffect(() => {
        setGenres(props.data.genres)
        setPlatforms(props.data.platforms)
        setDevs(props.data.dev)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        data.set("dev", JSON.stringify(devs))
        data.set("genres", JSON.stringify(genres))
        data.set("platforms", JSON.stringify(platforms))
        context.editItem(data, props.bid, props.data._id)
        props.closeModal()
    }

    const handleGenreClick = () => {
        if (genreInput !== "") {
            setGenres((prev) => [...prev, genreInput])
        }
    }

    const handlePlatformClick = () => {
        if (platformInput !== "") {
            setPlatforms((prev) => [...prev, platformInput])
        }
    }

    const handleDevClick = () => {
        if (devInput !== "") {
            setDevs((prev) => [...prev, devInput])
        }
    }

    const handleGenreRemove = (i) => {
        setGenres(genres.filter((_genre, index) => {
            return index !== i
        }))
    }

    const handlePlatformRemove = (i) => {
        setPlatforms(platforms.filter((_platform, index) => {
            return index !== i
        }))
    }

    const handleDevRemove = (i) => {
        setPlatforms(devs.filter((_dev, index) => {
            return index !== i
        }))
    }

    const handleClose = () => {
        setGenreInput("")
        setPlatformInput("")
        setDevInput("")
        setGenres(props.data.genres)
        setPlatforms(props.data.platforms)
        setDevs(props.data.dev)
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
                            <InputGroup>
                                <Form.Control type="text" name="dev" onChange={(e) => {setDevInput(e.target.value)}}/>
                                <Button variant="primary" className="btn-custom" onClick={handleDevClick}>Add</Button>
                            </InputGroup>
                            <div className="d-flex flex-wrap">
                                {devs.map((dev, i) => {
                                    return <TagItem key={i} index={i} name={dev} handleClick={handleDevRemove}/>
                                })}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Release Year:</Form.Label>
                            <Form.Control type="date" name="date" defaultValue={props.data.date}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Genres:</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" name="genres" onChange={(e) => {setGenreInput(e.target.value)}}/>
                                <Button variant="primary" className="btn-custom" onClick={handleGenreClick}>Add</Button>
                            </InputGroup>
                            <div className="d-flex flex-wrap">
                                {genres.map((genre, i) => {
                                    return <TagItem key={i} index={i} name={genre} handleClick={handleGenreRemove}/>
                                })}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Platforms:</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" name="platforms" onChange={(e) => { setPlatformInput(e.target.value) }} />
                                <Button variant="primary" className="btn-custom" onClick={handlePlatformClick}>Add</Button>
                            </InputGroup>
                            <div className="d-flex flex-wrap">
                                {platforms.map((platform, i) => {
                                    return <TagItem key={i} index={i} name={platform} handleClick={handlePlatformRemove}/>
                                })}
                            </div>
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
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button form="edit-item" type="submit" variant="primary" className="btn-custom">Update</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditItemModal;