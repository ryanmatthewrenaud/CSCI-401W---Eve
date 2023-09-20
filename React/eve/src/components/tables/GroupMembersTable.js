import React from 'react'
import APIDataService from '../../api/services/api.service'
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap'
import ConfirmDelete from '../forms/ConfirmDelete';
import GroupMemberForm from '../forms/GroupMemberForm';
import { useSelector } from 'react-redux';

const GroupMemberTable = () => {
    const group = useOutletContext().group;
    const memberPermission = useOutletContext().permission
    const user = useSelector((state) => state.user.userID);

    const [members, setMembers] = useState([]);

    const [deleteModal, toggleDeleteModal] = useState(false);
    const [editModal, toggleEditModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const handleDelete = (e) => {
        toggleDeleteModal(true);
        setDeleteTarget({ "group": group, "target": e.target.dataset, "callback": APIDataService.deleteMember });
    }

    const handleEditClick = (e) => {
        APIDataService.getGroupMember(group.id, e.target.dataset.id).then(response => {
            setEditTarget(response);
            toggleEditModal(true);
        })

    }

    useEffect(() => {
        if (group.id !== undefined) {
            APIDataService.getGroupMembers(group.id).then(data => {
                setMembers(data)
            })
        }
    }, [group])

    return (
        <Container>
            <h1>Members of {group.group_title}</h1>
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th>Permission Level</th>
                        <th>Date Joined</th>
                        {memberPermission > 0 &&
                            <th colSpan="2">Actions</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => {
                        let name = `${member.member.first_name} ${member.member.last_name}`;
                        let joined = new Date(Date.parse(member.date_joined)).toLocaleDateString('en-US');
                        return (
                            <tr key={member.id}>
                                <td>{name}</td>
                                <td>{member.group_role}</td>
                                <td>{member.permission_level === 0 && "User"} {member.permission_level === 2 && "Administrator"}</td>
                                <td>{joined}</td>
                                {memberPermission > 0 &&
                                    <>
                                        <td><Button onClick={handleEditClick} data-id={member.id} variant="secondary">Edit</Button></td>
                                        <td><Button disabled={member.member.id === user ? true : false} data-id={member.id} data-name={name} variant="danger" onClick={handleDelete}>Delete</Button></td>
                                    </>
                                }

                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <GroupMemberForm userData={editTarget} show={editModal} handleToggle={toggleEditModal} />

            <ConfirmDelete type="m" show={deleteModal} handleToggle={toggleDeleteModal} {...deleteTarget} />

        </Container>

    )
}

export default GroupMemberTable