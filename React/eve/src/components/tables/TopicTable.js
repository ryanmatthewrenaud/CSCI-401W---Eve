import { React, useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import APIDataService from '../../api/services/api.service';
import TopicsForm from '../forms/TopicsForm';
import { useOutletContext } from 'react-router-dom';
import ConfirmDelete from '../forms/ConfirmDelete';

const TopicTable = () => {
    const group = useOutletContext().group;

    const [topics, setTopics] = useState([]);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [modal, toggleModal] = useState(false);


    const handleDelete = (e) => {
        console.log(e);
        toggleModal(true);
        setDeleteTarget({ "group": group, "target": e.target.dataset, "callback": APIDataService.deleteTopic });
    }


    useEffect(() => {
        if (group.id !== undefined) {
            APIDataService.getTopics(group.id).then(data => {
                setTopics(data)
            })
        }
    }, [group])
    return (
        <>
            <Table hover size="sm">
                <thead>
                    <tr>
                        <th scope="col">Topics</th>
                        <th scope="col">Users</th>
                        <th scope="col">Staff</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map(topic => {
                        return (
                            <tr key={topic.id}>
                                <td>{topic.topics}</td>
                                <td>{topic.users.map(user => `${user.member.first_name} ${user.member.last_name} (${user.group_role})`)}</td>
                                <td>{`${topic.staff.member.first_name} ${topic.staff.member.last_name} (${topic.staff.group_role})`}</td>
                                <td><Button data-id={topic.id} variant="secondary">Edit</Button></td>
                                <td><Button onClick={handleDelete} data-id={topic.id} data-name={topic.topics} variant="danger">Remove</Button></td>
                            </tr>

                        )
                    })}

                </tbody>
            </Table>
            <TopicsForm />
            <ConfirmDelete type="c" show={modal} handleToggle={toggleModal} {...deleteTarget} />

        </>
    )
}

export default TopicTable