import React, {useState} from 'react'
import { Modal, Button, Form, FloatingLabel, Container } from 'react-bootstrap';
import ConfirmDelete from './ConfirmDelete';
import APIDataService from '../../api/services/api.service';
import { useOutletContext } from 'react-router-dom';


const GroupForm = (props) => {
  const context = useOutletContext()
  const group = context ? context.group : null;

  const [showDeleteModal, toggleDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState([])

  const Wrapper = props.mode === 0 ? Modal : Container;

  {/* 
    * CreateGroup Component allows for the creation of a group
    * Props: 
    * mode: 0 (creation modal), 1 (static, edit)
    * Form Inputs: 
    * GroupName(Name of Group)
    * GroupDescription (description)
    */}

  const handleSubmit = (e) => {
    e.preventDefault()
    let body = {
      group_title: e.target.groupName.value,
      group_description: e.target.groupDescription.value
    }

    APIDataService.createGroup(body).then(() => {
      props.handleToggle();
      window.location.reload();
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    let body = {
      group_title: e.target.groupName.value,
      group_description: e.target.groupDescription.value
    }

    APIDataService.updateGroup(group.id, body).then(() => {
      window.location.reload();
    })
  }

  const handleDelete = (e) => {
    toggleDeleteModal(true);
    setDeleteTarget({ "group": group, "target": e.target.dataset, "callback": APIDataService.deleteGroup });
  }
  return (

    <Wrapper show={props.mode === 0 ? props.show : "true"} onHide={props.mode === 0 ? props.handleToggle : null}>
      <Form onSubmit={props.mode === 0 ? handleSubmit : handleUpdate}>
        <Modal.Header closeButton={props.mode === 0}>
          <Modal.Title>{props.mode === 0 ? "Create Group" : "Edit Group Settings"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-3" controlId='groupName' label="Group Name">
            <Form.Control
              type="text"
              placeholder="Group Name"
              defaultValue={group ? group.group_title : null}
              required
            />
          </FloatingLabel>
          <FloatingLabel className="mb-3" controlId='groupDescription' label="Group Description">
            <Form.Control
              type="textarea"
              placeholder="Group Description"
              defaultValue={group ? group.group_description : null}
              required
            />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleToggle}>
            Close
          </Button>
          <Button type='submit' variant='primary' >
            {props.mode === 0 ? "Create" : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
      {props.mode === 1 &&
        <Button onClick={handleDelete} data-id={group.id} data-name={group.group_title} variant="danger">Delete Group</Button>
      }
      <ConfirmDelete type="g" show={showDeleteModal} handleToggle={toggleDeleteModal} {...deleteTarget}/>
    </Wrapper>
  )
}

export default GroupForm;