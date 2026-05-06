const BASE_URL = 'http://localhost:5000/api/guests';

// Helper 
async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function fetchGuests() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

export async function addGuest(formData) {
  const res = await fetch(BASE_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name: formData.name, email: formData.email }),
  });
  return handleResponse(res);
}

export async function toggleConfirm(guest) {
  const res = await fetch(`${BASE_URL}/${guest._id}`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ confirmed: !guest.confirmed }),
  });
  return handleResponse(res);
}

export async function toggleRSVP(guest) {
  const res = await fetch(`${BASE_URL}/${guest._id}`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ rsvp: !guest.rsvp }),
  });
  return handleResponse(res);
}

export async function updateGuest(id, fields) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(fields),
  });
  return handleResponse(res);
}

export async function removeGuest(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}
