import { Outlet, useParams } from "react-router-dom";
import SideNav from '../components/nav/SideNav'
import { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import APIDataService from '../api/services/api.service'
import { useSelector } from "react-redux";

const GroupList = () => {
    const groupID = useParams().id;
    const user = useSelector((state) => state.user.userID);
    const [groupObj, setGroup] = useState([]);
    const [permissionLevel, setPermissionLevel] = useState();
    const [memberID, setMemberID] = useState();

    useEffect(() => {
        APIDataService.getGroup(groupID).then(data => {
            setGroup(data)
        })
        if (user) {
            APIDataService.findMembership(groupID, user).then(data => {
                setPermissionLevel(data.permission_level);
                setMemberID(data.id)
            })
        }
    }, [groupID, user])
    return (
        <div>
            {memberID
                ? <Row>
                    <Col md={3}>
                        <SideNav group={groupObj.group_title} permission={permissionLevel} />
                    </Col>
                    <Col>
                        <Outlet context={{ group: groupObj, member: memberID, permission: permissionLevel }} />
                    </Col>
                </Row>
                : <Spinner animation="border" />
            }
        </div>

    )
}

export default GroupList;