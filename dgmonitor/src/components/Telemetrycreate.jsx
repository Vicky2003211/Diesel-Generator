import React, { useState } from 'react';
import '../css/Telemetrycreate.css';

const UpdateTelemetry = ({ dgId, existingData, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    fuel_level_percent: existingData?.fuel_level_percent || '',
    engine_temperature_celsius: existingData?.engine_temperature_celsius || '',
    running_status: existingData?.running_status || ''
  });

  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatusMsg('');
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/dgs/${dgId}/telemetry`, {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatusMsg('✅ Telemetry updated successfully');
        onUpdated && onUpdated();
        onClose();
      } else {
        setStatusMsg('❌ Update failed');
      }
    } catch (error) {
      setStatusMsg('❌ Server error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="update-modal" onClick={(e) => e.stopPropagation()}>
        <h3>🔄 Update Telemetry</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="fuel_level_percent"
            placeholder="Fuel Level (%)"
            value={formData.fuel_level_percent}
            onChange={handleChange}
          />
          <input
            type="number"
            name="engine_temperature_celsius"
            placeholder="Engine Temperature (°C)"
            value={formData.engine_temperature_celsius}
            onChange={handleChange}
          />
          <select
            name="running_status"
            value={formData.running_status}
            onChange={handleChange}
          >
            <option value="">-- Select Status --</option>
            <option value="running">Running</option>
            <option value="stopped">Stopped</option>
            <option value="fault">Fault</option>
          </select>

          <button type="submit" className="update-btn">Update</button>
          {statusMsg && <div className="status-msg">{statusMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default UpdateTelemetry;
