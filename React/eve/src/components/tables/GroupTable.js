import React from 'react'
import { Link } from 'react-router-dom'

const GroupTable = ({ user, group }) => {
    return (
        <div className="text-center">
            <table className="table table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">Group Name</th>
                        <th scope="col">Member Count</th>
                        <th scope="col">Organizer</th>
                    </tr>
                </thead>
                {group.map((groups) => (
                    <tbody>
                        <tr>
                            <td>{groups.groupname}</td>
                            <td>{groups.user.length}</td>
                            <td>{groups.owner.firstname + " " +  groups.owner.lastname}</td>
                        </tr>
                    </tbody>
                    ))}
            </table>
        </div>
    )
}

export default GroupTable