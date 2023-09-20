import React, { useState } from 'react'
import CreateEvent from '../forms/CreateEvent'
import CreateGroup from '../forms/CreateGroup'
import JoinGroup from '../forms/JoinGroup'
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/Event.css';
import ConflictForm from '../forms/SubmitConflict'
import ConflictTable from '../tables/ConflictTable'
import GroupMembersTable from '../tables/GroupMembersTable'
import GroupEventTable from '../tables/GroupEventTable'
import EventInfo from '../forms/EventInfo'

const Sidebar = () => {
    const [showCreateEvent, setShowCreateEvent] = useState(true);
    const [showCreateGroups, setShowCreateGroups] = useState(true);
    const [showConflictForm, setShowConflictForm] = useState(true);
    const [showConflictTable, setShowConflictTable] = useState(true);
    const [showGroupMembersTable, setShowGroupMembersTable] = useState(true);
    const [showEventTable, setShowEventTable] = useState(true);
    return (
        <div className='testing'>
            <nav className="side-container">
                <ul className="">
                    <li className="">
                        {/*Removed Name (CreateEvent) Now Only Displays Modal*/}
                        <CreateEvent />
                    </li>
                    <li>
                        <EventInfo/>
                    </li>
                    <li className="">
                        {/*Removed Name (CreateGroup) Now Only Displays Modal*/}
                        <CreateGroup />
                    </li>
                    <li>
                        {/*Removed Name (ConflictForm) Now Only Displays Modal*/}
                        <ConflictForm />
                    </li>
                    <li>
                        <JoinGroup/>
                    </li>
                    <li>
                        <button className='btn btn-primary' type="button" onClick={() => setShowConflictTable(s => !s)}>
                            Conflict Table
                        </button>
                        {!showConflictTable ? <ConflictTable /> : null}

                    </li>
                    <li>
                        <button className='btn btn-primary' type="button" onClick={() => setShowGroupMembersTable(s => !s)}>
                            Member
                        </button>
                        {!showGroupMembersTable ? <GroupMembersTable /> : null}
                    </li>
                    <li>
                        <button className='btn btn-primary' type="button" onClick={() => setShowEventTable(s => !s)}>
                            Event List
                        </button>
                        {!showEventTable ? <GroupEventTable /> : null}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar