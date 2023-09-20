import GroupCard from '../components/GroupCard';
import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap'
import APIDataService from '../api/services/api.service';
import JoinGroup from '../components/forms/JoinGroup';
import GroupForm from '../components/forms/GroupForm';
import { useSelector } from 'react-redux';

const GroupList = () => {
    const user = useSelector((state) => state.user.userID);
    const [groups, setGroups] = useState([]);

    const [showCreateModal, toggleCreateModal] = useState(false);

    const handleCreateGroup = () => {
        toggleCreateModal(true);
    }

    useEffect(() => {
        if (user) {
            APIDataService.getGroups().then(data => {
                setGroups(data)
            })

        }

    }, [user])

    var counter = 0
    return (
        <Container>
            <div className="row row-cols-3">
                {groups.map(group => {
                    return <GroupCard key={group.id} groupData={group} counter={counter++} />
                })}
            </div>
            <Button onClick={handleCreateGroup}>Create Group</Button>
            <JoinGroup />

            <GroupForm mode={0} show={showCreateModal} handleToggle={toggleCreateModal}/>


        </Container>

    );
}

export default GroupList;