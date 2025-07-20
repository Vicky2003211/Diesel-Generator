import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import TelemetryData from './Telemetrydata';
import CreateDG from './Createdg';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1


const Home = () => {
    const [dgList, setDgList] = useState([]);
    const [selectedDG, setSelectedDG] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const location = useLocation();
    const userdata = location.state || JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate(); // ✅ Step 2

    useEffect(() => {
        if (!userdata) {
            navigate('/');  // redirect to login if not authenticated
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dgResponse = await fetch(`http://localhost:5000/api/dgs?org_id=${userdata?.org_id}`);
                const dgs = await dgResponse.json();


                console.log(userdata)

                const dgWithTelemetry = await Promise.all(
                    dgs.map(async (dg) => {
                        try {
                            const telemetryRes = await fetch(`http://localhost:5000/api/dgs/${dg._id}/gettelemetry`);
                            const telemetry = await telemetryRes.json();
                            return { ...dg, ...telemetry };
                        } catch {
                            return dg;
                        }
                    })
                );

                setDgList(dgWithTelemetry);
            } catch (error) {
                console.error('Error fetching DG data:', error);
            }
        };



        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const openModal = (dg) => setSelectedDG(dg);
    const closeModal = () => setSelectedDG(null);

    const fetchLatestDG = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/dgs/telemetry/latest');
            const data = await res.json();

            if (data && data.dg_id) {
                setSelectedDG(data);
            } else {
                alert('No latest DG found');
            }
        } catch (err) {
            alert('Failed to fetch latest DG');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');

    };



    return (
        <div className="dashboard">
            <h2>🔧 Diesel Generator Monitoring Dashboard</h2>
            <div className="table-container">
                <table className="dg-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Serial Number</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dgList.map(dg => (
                            <tr key={dg._id}>
                                <td>{dg.name}</td>
                                <td>{dg.serial_number}</td>
                                <td>{dg.location}</td>

                                <td>
                                    <button className="view-btn" onClick={() => openModal(dg)}>
                                        Click Here
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="action-buttons-container">
                    <button className="latest-btn" onClick={fetchLatestDG}>📊 Latest DG</button>
                    {userdata?.role === 'admin' && (
                        <button className="create-btn" onClick={() => setShowCreateModal(true)}>
                            ➕ Create DG
                        </button>
                    )}
                    <button className="Logout-btn" onClick={handleLogout}> Logout </button>

                </div>
            </div>

            {selectedDG && <TelemetryData dg={selectedDG} onClose={closeModal} />}

            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <CreateDG
                            onClose={() => setShowCreateModal(false)}
                            onCreated={() => {
                                setShowCreateModal(false);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
