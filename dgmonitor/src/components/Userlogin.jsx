import React, { useState } from 'react';
import axios from 'axios';
import '../css/Userlogin.css'; 
import { useNavigate } from 'react-router-dom'; // ✅ Step 1



const AuthPage = () => {
  const [tab, setTab] = useState('login');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    user_id: '',
    username: '',
    password: '',
    role: 'admin',
    org_id: '',
    org_name: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ Step 2

  const handleLoginChange = e => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleRegisterChange = e => setRegisterData({ ...registerData, [e.target.name]: e.target.value });

   const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/dgs/login', loginData);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/home', { state: res.data });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/dgs/register', registerData);
      setMessage('🎉 Registration successful! You can now log in.');
      setTab('login');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-box">
        <h2 className="title">🚀 DG Monitoring Portal</h2>

        <div className="tab-buttons">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Login</button>
          <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Register</button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <input name="username" placeholder="Username" onChange={handleLoginChange} value={loginData.username} required />
            <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} value={loginData.password} required />
            <button type="submit" className="submit-btn">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <input name="user_id" placeholder="User ID" onChange={handleRegisterChange} value={registerData.user_id} required />
            <input name="username" placeholder="Username" onChange={handleRegisterChange} value={registerData.username} required />
            <input type="password" name="password" placeholder="Password" onChange={handleRegisterChange} value={registerData.password} required />
            <select name="role" onChange={handleRegisterChange} value={registerData.role}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <input name="org_id" placeholder="Organization ID" onChange={handleRegisterChange} value={registerData.org_id} required />
            <input name="org_name" placeholder="Organization Name" onChange={handleRegisterChange} value={registerData.org_name} required />
            <button type="submit" className="submit-btn">Register</button>
          </form>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};



export default AuthPage;
