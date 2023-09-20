import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/Event.css';
import { NavLink } from 'react-router-dom';

const SideNav = (props) => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light">
            <span className="fs-4">{props.group}</span>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to="calendar" className="nav-link" aria-current="page">
                        Calendar
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="members" className="nav-link">
                        Members
                    </NavLink>
                </li>
                
                {props.permission > 0 &&
                    <li className="nav-item">
                        <NavLink to="topics" className="nav-link">
                            Topics
                        </NavLink>
                    </li>
                }

                {props.permission > 0 &&
                    <li className="nav-item">
                        <NavLink to="invite-codes" className="nav-link">
                            Invite Codes
                        </NavLink>
                    </li>
                }

                <li className="nav-item">
                    <NavLink to="conflicts" className="nav-link">
                        Conflicts
                    </NavLink>
                </li>

                {props.permission > 0 &&
                    <li className="nav-item">
                        <NavLink to="settings" className="nav-link">
                            Settings
                        </NavLink>
                    </li>
                }
            </ul>
        </div>
    )
}

export default SideNav;