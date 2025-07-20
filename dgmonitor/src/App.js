import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/Userlogin';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

