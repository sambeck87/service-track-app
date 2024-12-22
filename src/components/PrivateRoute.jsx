import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Obtén el token del localStorage

  if (!token) {
    // Si no hay token, redirige al login
    return <Navigate to="/login" />;
  }

  // Si hay token, muestra el contenido protegido
  return children;
};

// Validación de props
PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired, // Validación para 'element'
};

export default PrivateRoute;
