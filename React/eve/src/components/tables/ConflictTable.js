import React from 'react'
import { Table, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import APIDataService from '../../api/services/api.service';
import ConflictForm from '../forms/ConflictForm';
import { useSelector } from 'react-redux';

const ConflictTable = () => {
    const group = useOutletContext().group;
    const memberPermission = useOutletContext().permission;
    const user = useSelector((state) => state.user.userID);
    const memberID = useOutletContext().member;
    const [conflicts, setConflicts] = useState([]);

    useEffect(() => {
        if (group.id) {
            APIDataService.getConflicts(group.id).then(data => {
                if (memberPermission === 0) {
                    setConflicts(data.filter(data => data.requested_by.member.id === user))
                } else {
                    setConflicts(data)
                }
            })
        }
    }, [group]);

    const handleApprove = (e) => {
        APIDataService.updateConflict(group.id, e.target.dataset.id, { "status": 2 })
    }

    const handleDecline = (e) => {
        APIDataService.updateConflict(group.id, e.target.dataset.id, { "status": 1 })
    }

    return (
        <Container>
            <h1>Conflicts for {group.group_title}</h1>

            <Table hover>
                <thead >
                    <tr>
                        {memberPermission > 0 &&
                            <th>Name</th>
                        }
                        <th>Conflict Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        {memberPermission > 0 &&
                            <th colSpan="2">Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {conflicts.map(conflict => {
                        let name = `${conflict.requested_by.member.first_name} ${conflict.requested_by.member.last_name}`;
                        return (
                            <tr className={conflict.status === 0 ? "table-warning" : conflict.status == 1 ? "table-danger" : "table-success"} key={conflict.id}>
                                {memberPermission > 0 &&
                                    <td>{name}</td>

                                }
                                <td>{conflict.date} ({conflict.all_day ? "All Day" : `${conflict.start_time} - ${conflict.end_time}`})</td>
                                <td>{conflict.reason}</td>
                                <td>{conflict.status === 0 && "Pending"} {conflict.status === 1 && "Declined"} {conflict.status === 2 && "Approved"}</td>

                                {memberPermission > 0 &&
                                    <>
                                        <td>
                                            <Button disabled={conflict.status === 2} data-id={conflict.id} onClick={handleApprove} className="btn btn-success btn-sm">Approve</Button>
                                        </td>
                                        <td>
                                            <Button disabled={conflict.status === 1} data-id={conflict.id} onClick={handleDecline} className="btn btn-danger btn-sm">Decline</Button>
                                        </td>
                                    </>
                                }

                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <ConflictForm group={group} member={memberID} />

        </Container>

    )
}

export default ConflictTable