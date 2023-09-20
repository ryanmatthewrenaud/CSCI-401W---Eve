import React, { useState } from "react";
import { Form, Button, Container, Card, FloatingLabel, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import APIDataService from '../api/services/api.service';

const RegisterPage = () => {
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [passwordIsValid, setPasswordValidity] = useState(false);
    const [formError, setFormError] = useState();
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        if (!passwordIsValid) {
            setFormError("Please verify that your password meets the requirements and that passwords match.");
        } else {
            let body = {
                username: e.target.username.value,
                first_name: e.target.firstName.value,
                last_name: e.target.lastName.value,
                email: e.target.email.value,
                password: e.target.password.value
            }

            APIDataService.createUser(body).then(response => {
                if(response.stack && response.message) {
                    setFormError(response.message);
                } else {
                    navigate("/login", { state: { message: "Registration successful!" } })
                    
                }
            });

        }

    }
    return (
        <Container className="Auth-form-container">
            <Form onSubmit={handleCreate} className="Auth-form">
                <Container className="Auth-form-content">
                    <Card.Title className="Auth-form-title">Create Account</Card.Title>
                    <Card.Text className="text-center"><Link to="/login">Already Registered?</Link></Card.Text>
                    <Card.Body>
                        <FloatingLabel className="mb-3" label="First Name" controlId='firstName'>
                            <Form.Control
                                type="text"
                                placeholder="First name"
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel className="mb-3" label="Last Name" controlId='lastName'>
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" label="Email Address" controlId='email'>
                            <Form.Control
                                type="email"
                                placeholder="user@example.com"
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" label="Username" controlId='username'>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" label="Password" controlId='password'>
                            <Form.Control
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </FloatingLabel>
                        <FloatingLabel className="mb-3" label="Verify Password" controlId='password2'>
                            <Form.Control
                                type="password"
                                onChange={e => setPasswordVerify(e.target.value)}
                                placeholder="Verify password"
                                required
                            />
                        </FloatingLabel>

                        <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={8}
                            value={password}
                            valueAgain={passwordVerify}
                            onChange={(isValid) => { setPasswordValidity(isValid) }} />

                        {formError && <Alert variant="danger">{formError}</Alert>}
                        <Form.Group className="d-grid gap-2 mt-3">
                            <Button type="submit">
                                Sign Up
                            </Button>
                        </Form.Group>
                    </Card.Body>
                </Container>
            </Form>
        </Container>
    )
}

export default RegisterPage;