import React, { useState } from 'react';
import '../css/Createdg.css';
import { useLocation } from 'react-router-dom';


const CreateDG = ({ onCreated }) => {
  const location = useLocation();
  const userdata = location.state || JSON.parse(localStorage.getItem('user'));
  const [formData, setFormData] = useState({
    name: '',
    serial_number: '',
    location: '',
    org_id: userdata?.org_id || '' // 🔗 fetch from localStorage

  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.serial_number || !formData.location) {
      setStatus('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/dgs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('Diesel Generator Created ✅');
        setFormData({ name: '', serial_number: '', location: '' });
        onCreated && onCreated(); 
      } else {
        setStatus('Failed to create DG ❌');
      }
    } catch (err) {
      setStatus('Server Error ❌');
    }
  };

  return (
    <div className="create-dg-card">
      <h3>➕ Create Diesel Generator</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="DG Name (e.g. DG-001)"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="serial_number"
          placeholder="Serial Number (e.g. XYZ123)"
          value={formData.serial_number}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location (e.g. Warehouse A)"
          value={formData.location}
          onChange={handleChange}
        />
        <button type="submit" className="submit-btn">Create</button>
        {status && <div className="status-msg">{status}</div>}
      </form>
    </div>
  );
};

export default CreateDG;
