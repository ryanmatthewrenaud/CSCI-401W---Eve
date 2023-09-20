import React, {useState} from 'react'
import { Modal, Button, Form, Container, FloatingLabel, Alert } from 'react-bootstrap';

const InviteCodeForm = (props) => {
    const [success, setSuccess] = useState();
    const handleCopy = async (e) => {
        if ("clipboard" in navigator) {
            await navigator.clipboard.writeText(e.target.dataset.code);
        } else {
            document.execCommand("copy", true, e.target.dataset.code);
        }
        setSuccess("Code copied!");


    }

    const handleClose = () => {
        props.handleToggle();
        window.location.reload();
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title > Generated Invite Code </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel className="mb-3" controlId='codeGenerated' label="Invite Code">
                    <Form.Control
                        type="text"
                        defaultValue={props.code.invite_code}
                        readOnly
                        plaintext
                    />
                </FloatingLabel>
                <p>Expires {props.code.expiration_date}</p>
                {success && <Alert variant="success">{success}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleCopy} data-code={props.code.invite_code} variant='primary'>
                    Copy to Clipboard
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default InviteCodeForm