import React, { useRef, useState } from 'react';
import FuelCircle from './Fuelcircle';
import UpdateTelemetry from '../components/Telemetrycreate';
import '../css/Telemetrydata.css';

const TelemetryCard = ({ dg, onClose }) => {
  const modalRef = useRef();
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleBackgroundClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const isTelemetryAvailable =
    dg.fuel_level_percent !== undefined &&
    dg.engine_temperature_celsius !== undefined &&
    dg.running_status !== undefined;

  return (
    <div className="telemetry-wrapper" onClick={handleBackgroundClick}>
      <div className="telemetry-modal" ref={modalRef}>
        <div className="modal-header">
          <span role="img" aria-label="search">🔍</span>
          <h3>
            <span className="dg-name">{dg.name}</span>
          </h3>
          <span className="close-btn" onClick={onClose}>✖️</span>
        </div>

        <div className="modal-body">
          {isTelemetryAvailable ? (
            <>
              <div className="fuel-container">
                <FuelCircle value={dg.fuel_level_percent} />
              </div>

              <div className="info-row">
                <span>Engine Temperature:</span>
                <span>{dg.engine_temperature_celsius}°C</span>
              </div>

              <div className="info-row">
                <span>Status:</span>
                <span className={`status-badge ${dg.running_status.toLowerCase()}`}>
                  {dg.running_status}
                </span>
              </div>
            </>
          ) : (
            <div className="no-data-container">
              <p>No telemetry data available for this DG.</p>
              <button className="update-btn" onClick={() => setShowUpdateForm(true)}>
                Update
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Update Telemetry Popup */}
      {showUpdateForm && (
        <UpdateTelemetry
          dgId={dg._id}
          existingData={dg}
          onClose={() => setShowUpdateForm(false)}
          onUpdated={() => {
            setShowUpdateForm(false);
            onClose(); 
          }}
        />
      )}
    </div>
  );
};

export default TelemetryCard;
