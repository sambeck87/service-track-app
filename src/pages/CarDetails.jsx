import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const CarDetails = () => {
  const { id: carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [maintenanceServices, setMaintenanceServices] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
  const [totalItems, setTotalItems] = useState(0);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        };

        const response = await axios.get(`${apiBaseUrl}/api/v1/cars/${carId}`, config);
        setCar(response.data.car);
      } catch (error) {
        console.error('Error al obtener detalles del auto', error);
      }
    };
    fetchCarDetails();
  }, [carId, apiBaseUrl]);

  useEffect(() => {
    const fetchMaintenanceServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        };

        const statusQuery = statusFilter ? `status%3D${statusFilter}` : '';
        const plateNumberQuery = car ? `plate_number%3D${car.plate_number}` : '';
        const filters = [statusQuery, plateNumberQuery].filter(Boolean).join('%3B');

        const response = await axios.get(
          `${apiBaseUrl}/api/v1/maintenance_services?filters=${filters}&limit=${pagination.limit}&offset=${pagination.offset}`,
          config
        );
        setMaintenanceServices(response.data.maintenance_services);
        setTotalItems(response.data.meta.total);
      } catch (error) {
        console.error('Error al obtener servicios de mantenimiento', error);
      }
    };

    if (car) {
      fetchMaintenanceServices();
    }
  }, [carId, statusFilter, pagination, car, apiBaseUrl]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handlePaginationChange = (e) => {
    const newPageSize = e.target.value;
    setPageSize(newPageSize);
    setPagination({ limit: newPageSize, offset: 0 });
  };

  const handlePageNext = () => {
    setPagination(prev => ({ ...prev, offset: prev.offset + pagination.limit }));
  };

  const handlePagePrev = () => {
    setPagination(prev => ({ ...prev, offset: Math.max(0, prev.offset - pagination.limit) }));
  };

  const isNextDisabled = pagination.offset + pagination.limit >= totalItems;

  const isPrevDisabled = pagination.offset === 0;

  const handleDeleteMaintenanceService = async (serviceId) => {
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este servicio de mantenimiento?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        };

        // Realiza la solicitud DELETE para eliminar el servicio de mantenimiento
        await axios.delete(`${apiBaseUrl}/api/v1/maintenance_services/${serviceId}`, config);

        // Actualiza el estado eliminando el servicio de la lista
        setMaintenanceServices(maintenanceServices.filter(service => service.id !== serviceId));
      } catch (error) {
        console.error('Error al eliminar el servicio de mantenimiento', error);
      }
    }
  };

  if (!car) return <div>Cargando detalles del auto...</div>;

  return (
    <div>
      <h2>{car.model} - {car.plate_number}</h2>
      <p>Año: {car.year}</p>
      <button onClick={() => navigate(`/cars/${carId}/edit`)}>Editar</button>

      <h3>Servicios de Mantenimiento</h3>
      <button onClick={() => navigate(`/maintenance_services/create?car_id=${carId}`)}>Agregar Servicio de Mantenimiento</button>
      <select onChange={handleStatusChange} value={statusFilter}>
        <option value="">Todos los status</option>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completado</option>
      </select>

      <ul>
        {maintenanceServices.map((service) => (
          <li key={service.id}>
            <p><strong>id:</strong> {service.id}</p>
            <p><strong>Descripción:</strong> {service.description}</p>
            <p><strong>Fecha:</strong> {service.date}</p>
            <p><strong>Status:</strong> {service.status}</p>
            <button onClick={() => navigate(`/maintenance_services/${service.id}/edit`)}>Editar</button>
            <button onClick={() => handleDeleteMaintenanceService(service.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div>
        <label>Paginación:</label>
        <select onChange={handlePaginationChange} value={pageSize}>
          <option value="10">10 elementos</option>
          <option value="50">50 elementos</option>
          <option value="100">100 elementos</option>
        </select>

        <div>
          <button onClick={handlePagePrev} disabled={isPrevDisabled}>Anterior</button>
          <button onClick={handlePageNext} disabled={isNextDisabled}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
