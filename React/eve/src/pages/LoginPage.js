import React, { useState } from "react"
import { Link, useLocation } from 'react-router-dom';
import "./styles/Login.css"
import TokenService from '../api/services/token.service'
import { Card, Button, Form, Container, Alert } from "react-bootstrap"


const LoginPage = (props) => {
	/* 
	* Login Component, used for logging a user into EVE, ACCOUNT Created stored in DATABASE
	* 
	* Form Inputs: 
	* Username(Username of user, pulls up users groups, and associated items)
	* Password(Password of user, secret key user is "CREATED")
	* 
	*/
	const [formError, setFormError] = useState();
	const {state} = useLocation();

	const handleLogin = (e) => {
		console.log(e)
		e.preventDefault();
		let data = {
			username: e.target.username.value,
			password: e.target.password.value
		}
		TokenService.login(data).then(response => {
			if (response.status !== 200 && response.message) {
				setFormError(response.message);

			}
		})
	};


	return (
		<Container className="Auth-form-container">
			<Form className="Auth-form" onSubmit={handleLogin}>
				<Container className="Auth-form-content">
					<Card.Title className="Auth-form-title">Sign in</Card.Title>
					{state !== null && state.message !== null && <Alert variant="success">{state.message}</Alert>}
					<Card.Text><Link to="/register">Don't have an account?</Link></Card.Text>
					<Card.Body>
						<Form.Group className="mt-3">
							<Form.Label >Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Username"
								id="username"
								required
							/>
						</Form.Group>
						<Form.Group className="mt-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								id="password"
								required
							/>
						</Form.Group>
						{formError && <Alert variant="danger">{formError}</Alert>}
						<Form.Group className="d-grid gap-2 mt-3">
							<Button className="gap-2 mt-3" type="submit">
								Log In
							</Button>
						</Form.Group>
					</Card.Body>
				</Container>
			</Form>
		</Container>
	)
}

export default LoginPage