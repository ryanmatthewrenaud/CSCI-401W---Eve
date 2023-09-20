import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ConfirmDelete = (props) => {
    const nav = useNavigate();

    const deleteObject = () => {
        if (props.type === "g") {
            props.callback(props.group.id).then(() => {
                props.handleToggle(false);
                return nav("/groups");
            })

        } else {
            if (props.target && props.group && props.callback) {
                props.callback(props.group.id, props.target.id).then(() => {
                    props.handleToggle(false);
                    window.location.reload();

                });
            }
        }
    }
    return (
        <Modal show={props.show} onHide={props.handleToggle}>
            <Modal.Header closeButton>
                Confirm Deletion
            </Modal.Header>
            <Modal.Body>
                {props.target && props.group ?

                    (props.type !== "g" ?
                    `Are you sure you want to delete ${props.target.name} from ${props.group.group_title}?`
                    : `Are you sure you want to delete ${props.target.name}?`)
                    : null


                }


            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={deleteObject}>Delete</Button>


            </Modal.Footer>
        </Modal>
    )

}

export default ConfirmDelete