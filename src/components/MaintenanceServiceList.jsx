import { Link } from 'react-router-dom';
import Button from './Button';
import PropTypes from 'prop-types';

const MaintenanceServiceList = ({ maintenanceServices, navigate, handleDelete }) => {
  return (
    <ul>
      {maintenanceServices.map((service) => (
        <li className='list-element' key={service.id}>
          <div>
            <p><strong>ID:</strong> {service.id}</p>
            {service.car ? (
              <>
                <p><strong>Placa: </strong>
                  <Link to={`/cars/${service.car.id}`}>
                    {service.car.plate_number}
                  </Link>
                </p>
              </>
            ) : (
              <p></p>
            )}

            <p><strong>Descripción:</strong> {service.description}</p>
            <p><strong>Fecha:</strong> {service.date}</p>
            <p><strong>Status:</strong> {service.status}</p>
          </div>
          <Button onClick={() => navigate(`/maintenance_services/${service.id}/edit`)}>Editar</Button>
          <Button onClick={() => handleDelete(service.id)}>Eliminar</Button>
        </li>
      ))}
    </ul>
  );
};

MaintenanceServiceList.propTypes = {
  maintenanceServices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  navigate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default MaintenanceServiceList;
