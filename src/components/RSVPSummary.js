import React from 'react';

function RSVPSummary({ guests }) {
  const total       = guests.length;
  const confirmed   = guests.filter(g => g.confirmed).length;
  const unconfirmed = total - confirmed;
  const rsvp        = guests.filter(g => g.rsvp).length;

  return (
    <div className="summary-card">
      <h2 className="summary-title">RSVP Summary</h2>
      <div className="summary-grid">
        <div className="summary-stat total">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total Guests</span>
        </div>
        <div className="summary-stat confirmed">
          <span className="stat-number">{confirmed}</span>
          <span className="stat-label">Confirmed</span>
        </div>
        <div className="summary-stat unconfirmed">
          <span className="stat-number">{unconfirmed}</span>
          <span className="stat-label">Unconfirmed</span>
        </div>
        <div className="summary-stat rsvp">
          <span className="stat-number">{rsvp}</span>
          <span className="stat-label">RSVP'd</span>
        </div>
      </div>
    </div>
  );
}

export default RSVPSummary;
