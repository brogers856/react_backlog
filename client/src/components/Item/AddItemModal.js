import { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, InputGroup, ListGroup, ListGroupItem } from "react-bootstrap"
import { BacklogContext, TagItem } from "..";

const AddItemModal = (props) => {
    const context = useContext(BacklogContext)
    const [genreInput, setGenreInput] = useState("")
    const [genres, setGenres] = useState([])
    const [platformInput, setPlatformInput] = useState("")
    const [platforms, setPlatforms] = useState([])
    const [devInput, setDevInput] = useState("")
    const [devs, setDevs] = useState([])
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
        data.set("dev", JSON.stringify(devs))
        data.set("genres", JSON.stringify(genres))
        data.set("platforms", JSON.stringify(platforms))
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
        setGenreInput("")
        setPlatformInput("")
        setDevInput("")
        setGenres([])
        setPlatforms([])
        setDevs([])
        props.closeModal();
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
                            <Form.Control type="date" name="date"/>
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