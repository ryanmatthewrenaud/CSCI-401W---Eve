import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { useState, useEffect } from 'react';
import APIDataService from '../api/services/api.service';
import { useOutletContext } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // needs additional webpack config!
import EventForm from './forms/EventForm';

const CalendarComponent = () => {
    const group = useOutletContext().group;
    const permission = useOutletContext().permission;
    const [eventList, setEventList] = useState([]);
    const [eventData, setEvent] = useState([]);
    const [showModal, toggleModal] = useState(false);
    const [modalMode, setModalMode] = useState(0);

    const handleEventClick = ({ event }) => {
        setEvent(event);
        setModalMode(1);
        toggleModal(true);
    }

    const handleCreateClick = () => {
        setEvent(null);
        setModalMode(0);
        toggleModal(true);
    }

    useEffect(() => {
        if (group.id !== undefined) {
            APIDataService.getEvents(group.id).then(data => {
                setEventList(data)
            })
        }
    }, [group, showModal])
    return (
        <Container>
            <h1>Calendar of Events</h1>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrap5Plugin]}
                themeSystem="bootstrap5"
                initialView="dayGridMonth"
                eventBackgroundColor={'#FF4500'}
                headerToolbar={{
                    left: 'dayGridMonth,timeGridWeek,timeGridDay,listYear',
                    center: 'title',
                    right: 'today,prev,next'
                }}
                events={eventList}
                contentHeight="auto"
                fixedWeekCount={false}
                eventClick={handleEventClick}
            />

            {permission > 0 && <Button variant="primary" onClick={handleCreateClick}>Create New</Button>}
            <EventForm group={group} key={showModal} show={showModal} permission={permission} eventData={eventData} mode={modalMode} handleToggle={toggleModal} />
        </Container>
    )

}

export default CalendarComponent;