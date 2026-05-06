import React, { useState, useEffect } from 'react';
import GuestForm from './components/GuestForm';
import GuestList from './components/GuestList';
import RSVPSummary from './components/RSVPSummary';
import {
  fetchGuests,
  addGuest,
  toggleConfirm,
  toggleRSVP,
  updateGuest,
  removeGuest,
} from './data/apiService';
import './App.css';
import eventImg from './images/eventImg.jpg';


function App() {
  const [guests,     setGuests]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState('');
  const [lastAction, setLastAction] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchGuests();
        setGuests(data);
        console.log('Guests loaded from MongoDB:', data);
      } catch (err) {
        setError('Could not connect to server. Is the backend running?');
        console.error('fetchGuests failed:', err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Task 1: Add guest → POST → MongoDB 
  const handleAddGuest = async (formData) => {
    try {
      const newGuest = await addGuest(formData);
      setGuests(prev => [...prev, newGuest]);
      setLastAction(`Added "${newGuest.name}"`);
      console.log('Guest added to MongoDB:', newGuest);
    } catch (err) {
      setError(`Add failed: ${err.message}`);
    }
  };

  //Task 2: Toggle confirm → PATCH → MongoDB
  const handleConfirm = async (id) => {
    const guest = guests.find(g => g._id === id);
    try {
      const updated = await toggleConfirm(guest);
      setGuests(prev => prev.map(g => g._id === id ? updated : g));
      setLastAction(`Toggled confirmation for "${updated.name}"`);
    } catch (err) {
      setError(`Update failed: ${err.message}`);
    }
  };

  //Task 3: Toggle RSVP → PATCH → MongoDB
  const handleToggleRSVP = async (id) => {
    const guest = guests.find(g => g._id === id);
    try {
      const updated = await toggleRSVP(guest);
      setGuests(prev => prev.map(g => g._id === id ? updated : g));
      setLastAction(`Toggled RSVP for "${updated.name}"`);
    } catch (err) {
      setError(`Update failed: ${err.message}`);
    }
  };

  //Task 6: Remove guest → DELETE → MongoDB
  const handleRemove = async (id) => {
    try {
      await removeGuest(id);
      setGuests(prev => prev.filter(g => g._id !== id));
      setLastAction(`Removed guest`);
    } catch (err) {
      setError(`Delete failed: ${err.message}`);
    }
  };

  //Task 7: Update guest info → PATCH → MongoDB
  const handleUpdate = async (id, fields) => {
    try {
      const updated = await updateGuest(id, fields);
      setGuests(prev => prev.map(g => g._id === id ? updated : g));
      setLastAction(`Updated "${updated.name}"`);
    } catch (err) {
      setError(`Update failed: ${err.message}`);
    }
  };

  return (
    <div className="app-wrapper">

      {/* Top Navigation */}
      <nav className="app-nav">
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
        </ul>
        <div className="nav-logo">
          <span className="nav-logo-name">Event Planner</span>
          <span className="nav-logo-year">2024</span>
        </div>
        <div className="nav-right">
          <a href="#instagram" className="nav-icon" aria-label="Instagram">&#9679;</a>
          <a href="#facebook"  className="nav-icon" aria-label="Facebook">&#9679;</a>
          <a href="#linkedin"  className="nav-icon" aria-label="LinkedIn">&#9679;</a>
          <button className="btn-contact">Contact Us</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Planning with Heart</h1>
          <div className="hero-divider" />
          <p className="hero-subtitle">
            Woman-owned Event Planning Company<br />Serving Rawalpindi and Beyond
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">

          {/* Intro */}
          <section className="intro-section" id="about">
            <div>
              <h2 className="intro-heading">Curated Event Experiences</h2>
              <p className="intro-text">
                Celebrating over a decade of service, we are a boutique event planning
                and design company specialising in nonprofit fundraising, conferences,
                and annual celebrations.
              </p>
              <p className="intro-text">
                We are inspired by our clients' mission, values, and goals to create
                memorable experiences. From spreadsheets to illustrated activations,
                let us help share your vision and build your dream event.
              </p>
            </div>
            <div style={{ background: 'var(--border)', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={eventImg}
                alt="Event"
                style={{
                  width: '100%',
                  borderRadius: '12px'
                }}
              />
            </div>
            </div>
          </section>

          {/* Error banner */}
          {error && (
            <div className="debug-panel" style={{ borderLeftColor: 'var(--red)', marginBottom: '24px' }}>
              <span className="debug-label" style={{ color: 'var(--red)' }}>Error</span>
              <span className="debug-info" style={{ color: 'var(--red)' }}>{error}</span>
              <button className="reset-btn" onClick={() => setError('')}>Dismiss</button>
            </div>
          )}

          {/* Status / Debug Panel (Task 5) */}
          <div className="debug-panel">
            <span className="debug-label">MongoDB Status</span>
            <span className="debug-info">
              Last action: <strong>{lastAction || '—'}</strong>
              &nbsp;·&nbsp; Guests in DB: <strong>{guests.length}</strong>
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--mid-gray)', fontStyle: 'italic' }}>
              Open DevTools Console to see API calls
            </span>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="summary-card" style={{ textAlign: 'center', padding: '60px', color: 'var(--mid-gray)', fontStyle: 'italic', letterSpacing: '1px' }}>
              Connecting to MongoDB...
            </div>
          ) : (
            <>
              {/* Task 4: RSVP Summary */}
              <RSVPSummary guests={guests} />

              {/* Task 1: Add Guest Form */}
              <GuestForm onAddGuest={handleAddGuest} />

              {/* Tasks 2, 6, 7, 8: Guest List */}
              <GuestList
                guests={guests}
                onConfirm={handleConfirm}
                onToggleRSVP={handleToggleRSVP}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
              />
            </>
          )}

        </div>
      </main>

      <footer className="app-footer">
        <p>CS-343 Web Technologies &nbsp;·&nbsp; Lab 14 &nbsp;·&nbsp; Event Planner App</p>
      </footer>

    </div>
  );
}

export default App;
