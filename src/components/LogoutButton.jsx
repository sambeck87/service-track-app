import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button id="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;