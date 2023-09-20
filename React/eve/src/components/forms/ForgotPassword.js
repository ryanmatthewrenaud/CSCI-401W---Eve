import React from 'react'
import '../styles/ForgotPassword.css';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

const ForgotPassword = () => {
    {/* 
    * ForgotPassword Component, used for resetting a users password (*NOT SETUP --> Passwords are reset on Admin panel(DJANGO))
    * Seperate Page View of Login
    * 
    * Form Inputs: 
    * Email Address("Sends" link to users email if they have an account on EVE * NOT SETUP * )
    * 
    */}
  return (
    <div className="forgotPassword-form-container">
      <form className="forgotPassword-form">
        <div className="forgotPassword-form-content">
          <h3 className="forgotPassword-form-title">Forgot Password</h3>
          <div className="text-center">
            Already registered? <a><Link to='/login'>Sign In</Link></a>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword