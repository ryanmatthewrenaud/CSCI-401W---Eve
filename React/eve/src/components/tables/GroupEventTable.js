import React from 'react';
import { useState, useEffect } from 'react';
import APIDataService from '../../api/services/api.service';

const GroupEventTable = (props) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        APIDataService.getEvents(props.group).then(data => {
            setEvents(data)
        })
    }, [props])

    return (
        <div className='text-center'>
            <table className="table table-hover table-border">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Agenda</th>
                        <th scope="col">Members</th>
                        <th scope='col'>Time</th>
                        <th scope='col'>Conflicts</th>
                        <th scope='col'>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => {
                        return (
                            <tr key={event.id}>
                                <td>{event.start}</td>
                                <td>{event.title}</td>
                                <td>{event.users.map(user => {
                                    return `${user.member_fname} ${user.member_lname}`
                                })} (Staff: {event.staff})</td>
                                <td>{event.start}</td>
                                <td>No Conflicts</td>
                                <td><a className="btn btn-primary">Edit</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default GroupEventTable