import React, { useState } from 'react';

const ModalForm = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here if needed
    onClose();
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form className="ana-modal-form" onSubmit={handleSubmit}>
      <label htmlFor="ana-modal-name">Name</label>
      <input
        id="ana-modal-name"
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <label htmlFor="ana-modal-email">Email</label>
      <input
        id="ana-modal-email"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="ana-modal-message">Message</label>
      <textarea
        id="ana-modal-message"
        name="message"
        placeholder="Type your message here"
        value={form.message}
        onChange={handleChange}
        rows={4}
        required
      />
      <button type="submit" className="custom-btn" style={{ marginTop: '1rem' }}>
        Send Message
      </button>
    </form>
  );
};

export default ModalForm;