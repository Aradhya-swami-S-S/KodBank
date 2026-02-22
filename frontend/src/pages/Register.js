import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await API.post('/api/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-info">
          <h1 className="brand-title">Join KodBank</h1>
          <p className="brand-tagline">Start your banking journey today</p>
          
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">🎁</span>
              <div>
                <h3>Instant Welcome Bonus</h3>
                <p>Instant credit on successful registration</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🚀</span>
              <div>
                <h3>Quick Setup</h3>
                <p>Get started in less than 2 minutes</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔐</span>
              <div>
                <h3>Secure & Protected</h3>
                <p>Your data is encrypted and safe with us</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💎</span>
              <div>
                <h3>Premium Features</h3>
                <p>Access to all banking services for free</p>
              </div>
            </div>
          </div>

          <div className="trust-badges">
            <div className="badge">🏆 Trusted by 10K+ users</div>
            <div className="badge">⭐ 4.9/5 Rating</div>
            <div className="badge">🔒 Bank-grade Security</div>
          </div>
        </div>

        <div className="register-box">
          <h2>Create Account</h2>
          <p className="register-subtitle">Fill in your details to get started</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <p className="login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
