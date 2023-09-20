import React, { useRef, useEffect, useState } from 'react'
import APIDataService from '../../api/services/api.service';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Row, Col, Container, FloatingLabel, Spinner } from 'react-bootstrap';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import ConfirmDelete from './ConfirmDelete';
import moment from 'moment';

const EventForm = (props) => {
  // Create: 0, View: 1, Edit: 2
  const [mode, setMode] = useState(props.mode);

  /* 
    * CreateEvent Component allows for the creation of events within a group 
    * Uses Modals, Form, Button, Row, Column, from Bootstrap allows for 'PopUp Form' 
    * 
    * showModal and setShowModal are useState that allow to show and hide modal when not needed.
    * 
    * Form Inputs: 
    * EventName(Name of event shown on calendar)
    * Date(Date of event shown on calendar)
    * StartTime(Beginning time of event)
    * EndTime(Ending time of event)
    * Topics(Topics that event covers(Concert, Practice, Meeting))
    * Users(All users within group, can be chosen which user to add to event)
    * Organizer(User creating the event)
    * 
    */

  const date = new Date()
  const current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  // Get group from URL

  const group = props.group;

  // Populate Users and Staff fields from API

  const [memberList, setMembers] = useState([]);
  const [staffList, setStaff] = useState([]);
  const [topicList, setTopics] = useState([]);
  const [otherTopic, setOtherTopic] = useState("");
  const [loading, toggleLoading] = useState(true);

  const [showDeleteModal, toggleDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState([])

  const [selectedUsers, setSelectedUsers] = useState();

  const userSelectRef = useRef(null);
  const staffSelectRef = useRef(null);


  const handleEditClick = () => {
    if (mode === 1) {
      setMode(2)
    }
  }

  useEffect(() => {
    APIDataService.getGroupMembers(group.id).then(data => {
      let memberList = data.map(mbr => {
        return { "value": mbr.id, "label": `${mbr.member.first_name} ${mbr.member.last_name} (${mbr.group_role})` }
      })
      setMembers(memberList)

      let staffList = data.filter(mbr => mbr.permission_level > 0).map(mbr => {
        return { "value": mbr.id, "label": `${mbr.member.first_name} ${mbr.member.last_name} (${mbr.group_role})` }
      })
      setStaff(staffList)
    })
    APIDataService.getTopics(group.id).then(data => {
      let topicList = data.map(topic => {
        return { "value": topic.id, "label": topic.topics }
      })
      setTopics(topicList);
      if (mode !== 0) {
        if (props.eventData.extendedProps.use_other) {
          setOtherTopic(props.eventData.extendedProps._other_topic)
        }
      }
      toggleLoading(false);

    })
  }, [group.id])


  const handleCreate = (e) => {
    e.preventDefault();

    let body = {
      title: e.target.eventName.value,
      group: group,
      start: new Date(Date.parse(`${e.target.date.value} ${e.target.startTime.value}`)).toISOString(),
      end: new Date(Date.parse(`${e.target.date.value} ${e.target.endTime.value}`)).toISOString(),
      users: selectedUsers.map(user => parseInt(user.value)),
      staff: e.target.staff.value,
      status: 0
    }

    if (e.target.otherTopic.value !== "") {
      body._other_topic = e.target.otherTopic.value;
      body.use_other = true
    } else {
      body._topic = e.target.topics.value;
      body.use_other = false;
    }
    APIDataService.createEvent(group, body).then(() => {
      props.handleToggle();
      window.location.reload();
    });
  }

  const handleUpdate = (e) => {

    e.preventDefault();
    let body = {
      title: e.target.eventName.value,
      group: group,
      start: new Date(Date.parse(`${e.target.date.value} ${e.target.startTime.value}`)).toISOString(),
      end: new Date(Date.parse(`${e.target.date.value} ${e.target.endTime.value}`)).toISOString(),
      users: userSelectRef.current.state.selectValue.map(user => parseInt(user.value)),
      staff: e.target.staff.value,
      status: 0
    }

    if (e.target.otherTopic.value !== "") {
      body._other_topic = e.target.otherTopic.value;
      body.use_other = true
    } else {
      body._topic = e.target.topics.value;
      body.use_other = false;
    }
    APIDataService.updateEvent(group, props.eventData.id, body).then(() => {
      props.handleToggle();
      window.location.reload();
    });
  }

  const handleDelete = () => {
    toggleDeleteModal(true);
    setDeleteTarget({ "group": group, "target": { id: props.eventData.id, name: props.eventData.title }, "callback": APIDataService.deleteEvent });

  }

  const handleTopicChange = (e) => {
    console.log(e);
    if (e) {
      if (topicList.find(topic => topic.value === e.value)) {
        setOtherTopic("");
        APIDataService.getTopic(group, e.value).then(data => {
          userSelectRef.current.setValue((memberList.filter(mbr => data.users.map(i => i.id).includes(mbr.value))));
          staffSelectRef.current.setValue((staffList.find(staff => staff.value === data.staff.id)));
        })
      } else {
        setOtherTopic(e.value);
      }
    }
  }

  const handleUserSelect = (selected) => {
    setSelectedUsers(selected);

  }


  return (
    <Container>
      <Modal show={props.show} onHide={props.handleToggle} size="lg">
        {loading ? <Spinner animation="border" />
          :
          <Form onSubmit={mode === 0 ? handleCreate : handleUpdate}>
            <Modal.Header closeButton>
              <Modal.Title>
                {mode === 0 && "Create Event"}
                {mode === 1 && `${props.eventData.title}`}
                {mode === 2 && `Editing ${props.eventData.title}`}
              </Modal.Title>
              {props.permission > 0 &&
                <Container>
                  {mode === 1 && <Button onClick={handleEditClick} className="m-1">Edit</Button>}
                  <Button variant="danger" onClick={handleDelete} className="m-1">Delete Event</Button>
                </Container>

              }
            </Modal.Header>
            <Modal.Body>
              <Container>
                <FloatingLabel className="mb-3" controlId='eventName' label="Event Name">
                  <Form.Control
                    type="text"
                    placeholder="Event Name"
                    name="eventName"
                    defaultValue={mode !== 0 ? props.eventData.title : null}
                    readOnly={mode === 1}
                    plaintext={mode === 1}
                  />
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId='date' label="Date">
                  <Form.Control
                    type="date"
                    min={current_time}
                    name="date"
                    defaultValue={mode !== 0 ? moment(props.eventData.start).local().format("YYYY-MM-DD") : null}
                    readOnly={mode === 1}
                    plaintext={mode === 1}
                  />
                </FloatingLabel>

                <Row>
                  <Col>
                    <FloatingLabel className="mb-3" controlId='startTime' label="Start Time">
                      <Form.Control
                        type="time"
                        name="startTime"
                        readOnly={mode === 1}
                        plaintext={mode === 1}
                        defaultValue={mode !== 0 ? moment(props.eventData.start).local().format("HH:mm") : null}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel className="mb-3" controlId='endTime' label="End Time">
                      <Form.Control
                        type="time"
                        name="endTime"
                        readOnly={mode === 1}
                        plaintext={mode === 1}
                        defaultValue={mode !== 0 ? moment(props.eventData.end).local().format("HH:mm") : null}
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <label htmlFor="topics">Topics</label>
                  <CreatableSelect defaultValue={mode != 0 ? (props.eventData.extendedProps.use_other ?
                    ({ value: "", label: props.eventData.extendedProps._other_topic }) :
                    topicList.find(topic => topic.value === props.eventData.extendedProps.event_topic.id)) :
                    null
                  }
                    isClearable
                    isDisabled={mode === 1}
                    class="form-select"
                    name="topics"
                    id="topics"
                    onChange={handleTopicChange}
                    options={topicList}
                  />
                </Form.Group>

                <Form.Control hidden type="text" value={otherTopic} readOnly id="otherTopic" name="otherTopic" />

                <Form.Group className="mb-3">
                  <label htmlFor="users">Users</label>
                  <Select ref={userSelectRef} isDisabled={mode === 1} defaultValue={mode !== 0 ? memberList.filter(mbr => props.eventData.extendedProps.users.map(i => i.id).includes(mbr.value)
                  ) : null} class="form-select" isMulti name="users" id="users" onChange={handleUserSelect} options={memberList} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <label htmlFor="staff">Staff</label>
                  <Select ref={staffSelectRef} isDisabled={mode === 1} defaultValue={mode !== 0 ? staffList.find(mbr => mbr.value === props.eventData.extendedProps.staff) : null} class="form-select" name="staff" id="staff" options={staffList} />
                </Form.Group>

              </Container>
            </Modal.Body>
            {mode !== 1 &&
              <Modal.Footer>
                <Button type='submit' variant='primary' >
                  {mode === 0 && "Create"}
                  {mode === 2 && "Update"}
                </Button>
              </Modal.Footer>

            }

          </Form>
        }
      </Modal >

      <ConfirmDelete type="e" show={showDeleteModal} handleToggle={toggleDeleteModal} {...deleteTarget} />
    </Container>
  )
}

export default EventForm;