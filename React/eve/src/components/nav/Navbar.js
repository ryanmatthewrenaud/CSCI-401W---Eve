import React from 'react';
import { Link, redirect } from 'react-router-dom';
import '../styles/Navbar.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { logout } from '../../stores/slices/userSlice';
import { store } from '../../stores/store';

const Navigationbar = () => {
    const user = useSelector((state) => state.user.username);

    const handleLogout = () => {
        store.dispatch(logout());
        redirect("/login")
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Link to='/' className='logo'>
                    <span className="logoStyle">EVE</span>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto"
                        navbarScroll
                    >
                        {user &&
                            <li className='navbarList'>
                                <Link to='/groups'>
                                    My Groups
                                </Link>
                            </li>
                        }

                        <li className='navbarList'>
                            <Link to='/premium'>
                                Premium
                            </Link>
                        </li>
                        <li className='navbarList'>
                            {user ?
                                <Link onClick={handleLogout}>
                                    Hi, {user} (Log Out)
                                </Link>
                                :
                                <Link to='/login'>
                                    Log In
                                </Link>
                            }
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigationbar