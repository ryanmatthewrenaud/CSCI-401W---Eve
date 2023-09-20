import { React, useState } from 'react'

import { Form, Button, Modal } from "react-bootstrap"



const TopicsForm = ({ edit }) => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)


    const [editMode, setEditMode] = useState(true);

    const HandleEditMode = () => setEditMode(!editMode)

    return (
        <>
            <Button hidden={!edit} variant='success' onClick={handleShow}>
                Create
            </Button>
            <Button hidden={edit} variant='secondary' onClick={handleShow}>
                Edit
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title hidden={!edit}>Create Topic</Modal.Title>
                        <Modal.Title hidden={edit}>Edit Topic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Topics</Form.Label>
                            <Form.Control
                                hidden={!edit}
                                type="text"
                                placeholder='Topics (create)'
                                required
                            />
                            <Form.Control
                                hidden={edit}
                                type="text"
                                placeholder='Topics (edit)'
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Users</Form.Label>
                            <Form.Control
                                hidden={!edit}
                                type="text"
                                placeholder='Users (create)'
                                required
                            />
                            <Form.Control
                                hidden={edit}
                                type="text"
                                placeholder='Users (edit)'
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Staff</Form.Label>
                            <Form.Control
                                hidden={!edit}
                                type="text"
                                placeholder='Staff (create)'
                                required
                            />
                            <Form.Control
                                hidden={edit}
                                type="text"
                                placeholder='Staff (edit)'
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button hidden={!edit}>Create</Button>
                        <Button hidden={edit}>Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default TopicsForm