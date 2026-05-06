import React, { useState } from 'react';

function GuestForm({ onAddGuest }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    console.log('New Guest Submitted:', { name, email });
    onAddGuest({ name: name.trim(), email: email.trim() });
    setName(''); setEmail(''); setErrors({});
  };

  return (
    <div className="guest-form-card">
      <h2 className="form-title">Add a Guest</h2>
      <form onSubmit={handleSubmit} className="guest-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name" type="text" placeholder="Enter guest name" value={name}
            className={errors.name ? 'input-error' : ''}
            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: '' })); }}
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email" type="email" placeholder="Enter email address" value={email}
            className={errors.email ? 'input-error' : ''}
            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: '' })); }}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Add Guest</button>
      </form>
    </div>
  );
}

export default GuestForm;
