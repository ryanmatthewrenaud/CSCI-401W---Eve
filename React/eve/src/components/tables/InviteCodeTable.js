import React, { useEffect, useState } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom';
import InviteCodeForm from '../forms/InviteCodeForm';
import ConfirmDelete from '../forms/ConfirmDelete';
import APIDataService from '../../api/services/api.service'

const InviteCodeTable = () => {
    const [codes, setCodes] = useState([]);
    const group = useOutletContext().group;

    const [deleteTarget, setDeleteTarget] = useState([]);
    const [showDeleteModal, toggleDeleteModal] = useState();
    const [generatedCodeData, setGeneratedCodeData] = useState([]);
    const [showCopyModal, toggleCopyModal] = useState();


    useEffect(() => {
        if (group) {
            APIDataService.getInviteCodes(group.id).then(data => {
                setCodes(data)
            })
        }

    }, [group])

    const handleDelete = (e) => {
        toggleDeleteModal(true);
        setDeleteTarget({ "group": group, "target": e.target.dataset, "callback": APIDataService.deleteInviteCode });
    }
    const generateCode = () => {
        APIDataService.createInviteCode(group.id).then(data => {
            setGeneratedCodeData(data);
            toggleCopyModal(true);
            console.log(data);
        })
    }
    return (
        <Container>
            <h1> Invite Codes </h1>
            <Table hover>
                <thead>
                    <tr>
                        <th scope="col">Invite Code</th>
                        <th scope="col">Expiration Date</th>
                        <th scope="col">Active?</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {codes.map(code => {
                        return (
                            <tr key={code.invite_code}>
                                <td>{code.invite_code}</td>
                                <td>{new Date(Date.parse(code.expiration_date)).toLocaleString("en-US")}</td>
                                <td>{code.is_valid ? "Yes" : "No"}</td>
                                <td><Button onClick={handleDelete} data-id={code.id} data-name={code.invite_code} className="btn btn-danger">Delete</Button></td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <Button onClick={generateCode} variant="primary">Generate New Code</Button>
            <InviteCodeForm show={showCopyModal} code={generatedCodeData} handleToggle={toggleCopyModal} />
            <ConfirmDelete show={showDeleteModal} handleToggle={toggleDeleteModal} {...deleteTarget} />
        </Container>
    )
}

export default InviteCodeTable