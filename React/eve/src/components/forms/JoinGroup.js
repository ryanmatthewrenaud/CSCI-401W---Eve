import React, { useState } from 'react'
import { Modal, Button, Form, Alert, FloatingLabel, Container } from 'react-bootstrap';
import APIDataService from '../../api/services/api.service';
import pluralize from 'pluralize';
import { useSelector } from 'react-redux';

const JoinGroup = () => {
    const [showModal, setShowModal] = useState(false);
    const [formError, setFormError] = useState();
    const [groupData, setGroupData] = useState();
    const user = useSelector((state) => state.user.userID);


    const handleToggle = () => {
        setShowModal(!showModal);
        setGroupData()
    }

    const joinCodeLength = 8;

    const handleInviteCode = (e) => {
        e.preventDefault();

        let body = {
            code: e.target.groupCode.value
        }

        APIDataService.verifyInviteCode(JSON.stringify(body)).then(data => {
            if (data.message) {
                setFormError(data.message);
            } else {
                setFormError();
                setGroupData(data);
            }
        })

    }

    const handleJoin = (e) => {
        e.preventDefault();

        let body = {
            group: groupData.id,
            member_id: user,
            group_role: e.target.groupRole.value,
            permission_level: 0
        }

        APIDataService.addGroupMember(body).then(response => {
            handleToggle()
        });
    }

    return (
        <>
            <Button variant='primary' onClick={handleToggle}>
                Join Group
            </Button>
            <Modal show={showModal} onHide={handleToggle}>
                {!groupData ?
                    <Form onSubmit={handleInviteCode}>
                        <Modal.Header closeButton>
                            <Modal.Title>Join Group</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FloatingLabel label="Group Code" controlId="groupCode">
                                <Form.Control
                                    type="text"
                                    name="groupCode"
                                    placeholder="Enter 8-digit code"
                                    minLength={joinCodeLength}
                                    maxLength={joinCodeLength}
                                />

                            </FloatingLabel>
                            {formError && <Alert variant="danger">{formError}</Alert>}

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleToggle}>
                                Cancel
                            </Button>
                            <Button type='submit' variant='primary'>
                                Join
                            </Button>
                        </Modal.Footer>
                    </Form>
                    : <Container>
                        <Form onSubmit={handleJoin}>
                            <Modal.Body>
                                <h2>{groupData.group_title}</h2>
                                <p>{groupData.group_description}</p>
                                <p>{pluralize("member", groupData.member_count, true)}</p>
                                <FloatingLabel controlId="groupRole" label="Role in Group">
                                    <Form.Control type="text" name="groupRole" />
                                </FloatingLabel>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleToggle}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant='primary'>
                                    Join
                                </Button>
                            </Modal.Footer>
                        </Form>

                    </Container>
                }
            </Modal>
        </>
    )
}

export default JoinGroup