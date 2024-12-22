import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Obtener la ruta actual

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Verificar si hay un token
  }, []);

  // Evitar mostrar el header en las páginas de Login o Register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header>
      {isAuthenticated && (
        <nav>
          <ul>
            <li>
              <Link to="/cars">Cars</Link>
            </li>
            <li>
              <Link to="/maintenance_services">Maintenance</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;