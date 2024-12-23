import { Link, useLocation } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import '../styles/header.css'

const Header = () => {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <header>
        <nav>
          <ul id='header-links'>
            <li>
              <Link to="/cars">Cars</Link>
            </li>
            <li>
              <Link to="/maintenance_services">Maintenance</Link>
            </li>
          </ul>
        </nav>
      <LogoutButton />
    </header>
  );
};

export default Header;