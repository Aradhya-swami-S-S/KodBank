import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Confetti from 'react-confetti';
import Chatbot from '../components/Chatbot';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState({ username: '', email: '', role: '' });
  const [activeSection, setActiveSection] = useState('home');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatbotExpanded, setIsChatbotExpanded] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await API.get('/api/user-info');
      setUserInfo(response.data);
    } catch (err) {
      console.error('Failed to fetch user info:', err);
    }
  };

  const checkBalance = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await API.get('/api/balance');
      setBalance(response.data.balance);
      setShowConfetti(true);
      
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch balance');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await API.post('/api/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/login');
    }
  };

  return (
    <div className="dashboard-container">
      {showConfetti && <Confetti />}
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-brand">KodBank</h1>
          <p className="sidebar-tagline">Your Trusted Partner</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-item ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => setActiveSection('home')}
          >
            <span className="sidebar-icon">🏠</span>
            <span>Home</span>
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'services' ? 'active' : ''}`}
            onClick={() => setActiveSection('services')}
          >
            <span className="sidebar-icon">⚙️</span>
            <span>Services</span>
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveSection('transactions')}
          >
            <span className="sidebar-icon">💸</span>
            <span>Transactions</span>
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveSection('cards')}
          >
            <span className="sidebar-icon">💳</span>
            <span>Cards</span>
          </button>
          <button 
            className={`sidebar-item ${activeSection === 'support' ? 'active' : ''}`}
            onClick={() => setActiveSection('support')}
          >
            <span className="sidebar-icon">💬</span>
            <span>Support</span>
          </button>
          <button 
            className={`sidebar-item ${isChatbotOpen ? 'active' : ''}`}
            onClick={() => setIsChatbotOpen(true)}
          >
            <span className="sidebar-icon">🤖</span>
            <span>AI Assistant</span>
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn-sidebar" onClick={handleLogout}>
            <span className="sidebar-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Floating Chat Button */}
      {!isChatbotOpen && (
        <button 
          className="chat-float-btn"
          onClick={() => setIsChatbotOpen(true)}
          title="Chat with AI Assistant"
        >
          💬
        </button>
      )}

      {/* Chatbot */}
      <Chatbot 
        isOpen={isChatbotOpen}
        onClose={() => {
          setIsChatbotOpen(false);
          setIsChatbotExpanded(false);
        }}
        isExpanded={isChatbotExpanded}
        onToggleExpand={() => setIsChatbotExpanded(!isChatbotExpanded)}
      />

      {/* Main Content */}
      <div className="main-wrapper">
        <header className="top-header">
          <h2 className="page-title">
            {activeSection === 'home' && 'Dashboard'}
            {activeSection === 'services' && 'Our Services'}
            {activeSection === 'transactions' && 'Transactions'}
            {activeSection === 'cards' && 'Your Cards'}
            {activeSection === 'support' && 'Customer Support'}
          </h2>
          <div className="user-badge">
            <span className="user-avatar">👤</span>
            <span className="user-name">{userInfo.username || 'User'}</span>
          </div>
        </header>
        
        <div className="dashboard-content">
          {activeSection === 'home' && (
            <>
              {/* User Info Card */}
              <div className="user-info-card">
                <p className="welcome-text">Welcome back,</p>
                <h2 className="username">{userInfo.username || 'User'}</h2>
                <p className="user-details">{userInfo.email || ''} · {userInfo.role || 'customer'}</p>
              </div>

              {/* Balance Check Card */}
              <div className="balance-card">
                <div className="party-icon">🎉</div>
                <p className="balance-prompt">Ready to see your balance?</p>
                
                {error && <div className="error-message">{error}</div>}
                
                <button 
                  className="check-balance-btn" 
                  onClick={checkBalance}
                  disabled={loading}
                >
                  <span className="btn-icon">✍️</span>
                  {loading ? 'Loading...' : 'Check Balance'}
                </button>
                
                {balance !== null && (
                  <div className="balance-display">
                    <p className="balance-label">Your balance is</p>
                    <p className="balance-amount">₹ {parseFloat(balance).toLocaleString('en-IN')}</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeSection === 'services' && (
            <div className="services-section">
              <h2 className="section-title">Our Services</h2>
              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon">💰</div>
                  <h3>Savings Account</h3>
                  <p>High-interest savings accounts with flexible withdrawal options</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">💳</div>
                  <h3>Credit Cards</h3>
                  <p>Premium credit cards with cashback and reward points</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">🏠</div>
                  <h3>Home Loans</h3>
                  <p>Competitive interest rates on home loans up to ₹1 Crore</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">📱</div>
                  <h3>Mobile Banking</h3>
                  <p>24/7 access to your account from anywhere</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">🔒</div>
                  <h3>Secure Transactions</h3>
                  <p>Bank-grade security with end-to-end encryption</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">💼</div>
                  <h3>Business Banking</h3>
                  <p>Tailored solutions for small and medium businesses</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'transactions' && (
            <div className="transactions-section">
              <h2 className="section-title">Recent Transactions</h2>
              <div className="transactions-list">
                <div className="transaction-item">
                  <div className="transaction-info">
                    <span className="transaction-icon">📥</span>
                    <div>
                      <p className="transaction-title">Account Opening Bonus</p>
                      <p className="transaction-date">Today, 10:30 AM</p>
                    </div>
                  </div>
                  <span className="transaction-amount credit">+₹1,00,000</span>
                </div>
                <div className="empty-state">
                  <p>No more transactions to show</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'cards' && (
            <div className="cards-section">
              <h2 className="section-title">Your Cards</h2>
              <div className="card-display">
                <div className="credit-card">
                  <div className="card-header">
                    <span className="card-logo">KodBank</span>
                    <span className="card-type">💳</span>
                  </div>
                  <div className="card-chip">🔲</div>
                  <div className="card-number">**** **** **** 1234</div>
                  <div className="card-footer">
                    <div>
                      <p className="card-label">Card Holder</p>
                      <p className="card-value">{userInfo.username?.toUpperCase() || 'USER'}</p>
                    </div>
                    <div>
                      <p className="card-label">Expires</p>
                      <p className="card-value">12/25</p>
                    </div>
                  </div>
                </div>
                <button className="apply-card-btn">Apply for New Card</button>
              </div>
            </div>
          )}

          {activeSection === 'support' && (
            <div className="support-section">
              <h2 className="section-title">Customer Support</h2>
              <div className="support-grid">
                <div className="support-card">
                  <div className="support-icon">📞</div>
                  <h3>Call Us</h3>
                  <p>1800-123-4567</p>
                  <p className="support-time">24/7 Available</p>
                </div>
                <div className="support-card">
                  <div className="support-icon">✉️</div>
                  <h3>Email Support</h3>
                  <p>support@kodbank.com</p>
                  <p className="support-time">Response within 24 hours</p>
                </div>
                <div className="support-card">
                  <div className="support-icon">💬</div>
                  <h3>Live Chat</h3>
                  <p>Chat with our agents</p>
                  <button className="chat-btn">Start Chat</button>
                </div>
                <div className="support-card">
                  <div className="support-icon">❓</div>
                  <h3>FAQs</h3>
                  <p>Find quick answers</p>
                  <button className="faq-btn">View FAQs</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
