import React from 'react';
import './styles/Premium.css';
import "bootstrap/dist/css/bootstrap.min.css"

const Premium = () => {
  return (
        <div className="premium-form-container">
          <form className="premium-form">
            <div className="premium-form-content">
              <h3 className="premium-form-title">Premium Plan</h3>
              <div className="text-center">
                <h5>Price: $4.99</h5>
              </div>
                <ul className="premium-unordered-list">
                    <li className="premium-list">
                        <h5>Increased capacity of organizers and users for events </h5>
                    </li>
                    <li className="premium-list">
                        <h5>Unlimited Events</h5>
                    </li>
                    <li className="premium-list">
                        <h5>Ad-free experience</h5>
                    </li>
                </ul>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                    Upgrade
                </button>
              </div>
            </div>
          </form>
        </div>  
    )
}

export default Premium