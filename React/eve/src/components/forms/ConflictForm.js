import React from 'react'
import { useState } from 'react';
import { Modal, Button, Row, Col, Form, Container, FloatingLabel } from 'react-bootstrap';
import APIDataService from '../../api/services/api.service';

/*
    ConflictForm Component, used to create Condlict items within a Group,
*/
const ConflictForm = (props) => {
    const group = props.group;
    const memberID = props.member;


    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
   
    const [allDay, setAllDay] = useState(false);

    const allDayToggle = () => {
        setAllDay(!allDay);
    }
    /*
        Used a form tag, to create a 
        * 
        * Form Inputs: 
        * Name(User Signed In),
        * Date(Date that conflict is happening)
        * StartTime(Time that conflict begins)
        * EndTime(Time that conflict ends)
        * Reason(Reason for conflict)
        * Organizer(Admin/Creator of group receiving conflict)
    */

    const handleConflictSubmit = (e) => {
        console.log("hi");
        e.preventDefault();

        let body = {
            requestor_id: memberID,
            date: e.target.date.value,
            reason: e.target.conflictReason.value,
            status: 0
        }

        if (allDay) {
            body.all_day = true;
            body.start_time = null;
            body.end_time = null;
        } else {
            body.all_day = false;
            body.start_time = e.target.startTime.value;
            body.end_time = e.target.endTime.value;
        }

        console.log(body)

        APIDataService.submitConflict(group.id, body).then(() => {
            setShowModal(false);
            window.location.reload()
        })
    }

    return (
        <Container>
            <Button onClick={setShowModal}>New Conflict Request</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Form onSubmit={handleConflictSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Conflict</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <FloatingLabel className="mb-3" controlId='date' label="Date">
                                <Form.Control
                                    type="date"
                                    name="date"
                                />
                            </FloatingLabel>

                            <Form.Check className="mb-3"
                                value={allDay}
                                onChange={allDayToggle}
                                name="allDay"
                                label="All-Day"
                            />

                            <Row className="mb-3">
                                <Col>
                                    <FloatingLabel hidden={allDay} controlId='startTime' label="Start Time">
                                        <Form.Control
                                            type="time"
                                            name="startTime"
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel hidden={allDay} controlId='endTime' label="End Time">
                                        <Form.Control
                                            type="time"
                                            name="endTime"
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>


                            <FloatingLabel className="mb-3" controlId='conflictReason' label="Reason">
                                <Form.Control
                                    type="text"
                                    name="conflictReason"
                                    placeholder="Conflict Reason"
                                />
                            </FloatingLabel>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant='primary'>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}

export default ConflictForm