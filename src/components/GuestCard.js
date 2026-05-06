import React, { useState } from 'react';

function GuestCard({ guest, onConfirm, onToggleRSVP, onRemove, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName,  setEditName]  = useState(guest.name);
  const [editEmail, setEditEmail] = useState(guest.email);

  const handleSave = () => {
    if (!editName.trim() || !editEmail.trim()) return;
    onUpdate(guest._id, { name: editName.trim(), email: editEmail.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(guest.name); setEditEmail(guest.email); setIsEditing(false);
  };

  return (
    <div className={`guest-card${guest.confirmed ? ' guest-confirmed' : ''}${guest.rsvp ? ' guest-rsvp' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <div className="edit-row">
            <input className="edit-input" value={editName}  placeholder="Name"  onChange={e => setEditName(e.target.value)} />
            <input className="edit-input" value={editEmail} placeholder="Email" onChange={e => setEditEmail(e.target.value)} />
          </div>
          <div className="edit-actions">
            <button className="btn btn-save"   onClick={handleSave}>Save</button>
            <button className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="guest-info">
            <div className="guest-name">
              <span className="name-text">{guest.name}</span>
              {guest.confirmed && <span className="badge confirmed-badge">Confirmed</span>}
              {guest.rsvp      && <span className="badge rsvp-badge">RSVP'd</span>}
            </div>
            <div className="guest-email">{guest.email}</div>
          </div>
          <div className="guest-actions">
            <button className={`btn btn-confirm${guest.confirmed ? ' btn-confirmed' : ''}`} onClick={() => onConfirm(guest._id)}>
              {guest.confirmed ? '✓ Confirmed' : 'Confirm'}
            </button>
            <button className={`btn btn-rsvp${guest.rsvp ? ' btn-rsvped' : ''}`} onClick={() => onToggleRSVP(guest._id)}>
              {guest.rsvp ? 'RSVP: Yes' : 'RSVP'}
            </button>
            <button className="btn btn-edit"   onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-remove" onClick={() => onRemove(guest._id)}>Remove</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GuestCard;
