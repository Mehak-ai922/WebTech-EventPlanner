import React from 'react';
import GuestCard from './GuestCard';

function GuestList({ guests, onConfirm, onToggleRSVP, onRemove, onUpdate }) {
  return (
    <div className="guest-list-card">
      <h2 className="list-title">Guest List</h2>
      {guests.length === 0 ? (
        <div className="empty-state">No guests yet. Add someone above to get started.</div>
      ) : (
        <div className="guest-list">
          {guests.map(guest => (
            <GuestCard
              key={guest._id}
              guest={guest}
              onConfirm={onConfirm}
              onToggleRSVP={onToggleRSVP}
              onRemove={onRemove}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GuestList;
