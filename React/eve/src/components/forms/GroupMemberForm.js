import { React } from 'react'
import { Form, Button, Modal, FloatingLabel } from "react-bootstrap";
import APIDataService from '../../api/services/api.service'



const GroupMemberForm = (props) => {

    const memberName = props.userData ? `${props.userData.member.first_name} ${props.userData.member.last_name}` : null;

    const handleUpdate = (e) => {
        e.preventDefault();
        let body = {
            group_role: e.target.group_role.value,
            permission_level: e.target.permission_level.value,
        }

        APIDataService.updateGroupMember(props.userData.group, props.userData.id, body).then(() => {
            props.handleToggle();
            window.location.reload();
        })
    }

    return (
        <Modal show={props.show} onHide={props.handleToggle}>
            <Form onSubmit={handleUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing User {memberName ? memberName : null}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel className="mb-3" label="Group Role" controlId="group_role">
                        <Form.Control
                            type="text"
                            placeholder='role'
                            defaultValue={props.userData ? props.userData.group_role : ""}
                        />
                    </FloatingLabel>
                    <FloatingLabel className="mb-3" label="Permission Level" controlId="permission_level">
                        <Form.Select defaultValue={props.userData ? props.userData.permission_level : 0}>
                            <option value="0">User</option>
                            <option value="2">Administrator</option>
                        </Form.Select>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Update</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default GroupMemberForm;