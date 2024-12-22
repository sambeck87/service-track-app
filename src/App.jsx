import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import CarForm from './pages/CarForm';
import MaintenanceServices from './pages/MaintenanceServices';
import MaintenanceForm from './pages/MaintenanceForm';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import LogoutButton from './components/LogoutButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <LogoutButton />
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute><Cars /></PrivateRoute>} />
        <Route path="/cars" element={<PrivateRoute><Cars /></PrivateRoute>} />
        <Route path="/cars/:id" element={<PrivateRoute><CarDetails /></PrivateRoute>} />
        <Route path="/cars/:id/edit" element={<PrivateRoute><CarForm /></PrivateRoute>} />
        <Route path="/cars/create" element={<PrivateRoute><CarForm /></PrivateRoute>} />

        <Route path="/maintenance_services" element={<PrivateRoute><MaintenanceServices /></PrivateRoute>} />
        <Route path="/maintenance_services/:id/edit" element={<PrivateRoute><MaintenanceForm /></PrivateRoute>} />
        <Route path="/maintenance_services/create" element={<PrivateRoute><MaintenanceForm /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
