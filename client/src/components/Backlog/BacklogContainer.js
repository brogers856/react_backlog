import { useEffect, useState, useContext, useCallback } from "react";
import React from "react";
import { NewBacklogButton, Backlog, BacklogContext } from "..";
import { Modal, Form, Button } from 'react-bootstrap';

const BacklogContainer = () => {
    const context = useContext(BacklogContext);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [showEdit, setShowEdit] = useState(false);
    const [editName, setEditName] = useState("");
    const [editID, setEditID] = useState();


    useEffect(async () => {
        context.fetchBacklogs();
    }, [])

    const editBacklog = async () => {
        context.editBacklog(editID, editName)
        setShowEdit(false);
    }

    const deleteBacklog = (id) => {
        context.deleteBacklog(id);
        closeDelete();
    }

    const showDeleteModal = useCallback((id) => {
        setDeleteID(id);
        setShowDelete(true);
    }, [])

    const closeDelete = () => {
        setDeleteID(null);
        setShowDelete(false);
    }

    const showEditModal = useCallback((id, name) => {
        setEditID(id);
        setEditName(name);
        setShowEdit(true);
    }, [])
    
    return(
        <> 
            {context.backlogs.map((backlog) => {
                return <Backlog key={backlog._id} id={backlog._id} items={backlog.items} name={backlog.name} showEditHandler={showEditModal} showDeleteHandler={showDeleteModal}/>
            })}

            <NewBacklogButton />
            
            <Modal show={showDelete} centered>
                <Modal.Body>
                    <p>Are you sure you want to delete this backlog? All items will be deleted.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeDelete()}>No</Button>
                    <Button variant="primary" className="btn-custom" onClick={() => deleteBacklog(deleteID)}>Yes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Backlog Name</Form.Label>
                            <Form.Control type="text" defaultValue={editName} onChange={(event) => setEditName(event.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
                    <Button variant="primary" className="btn-custom" onClick={editBacklog}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BacklogContainer;