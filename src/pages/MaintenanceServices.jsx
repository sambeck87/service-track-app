import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MaintenanceServices = () => {
  const navigate = useNavigate();

  const [maintenanceServices, setMaintenanceServices] = useState([]);
  const [plateNumberFilter, setPlateNumberFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
  const [totalItems, setTotalItems] = useState(0);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchMaintenanceServices = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      };

      const plateNumberQuery = plateNumberFilter ? `plate_number%3D${plateNumberFilter}` : '';
      const statusQuery = statusFilter ? `status%3D${statusFilter}` : '';
      const filters = [plateNumberQuery, statusQuery].filter(Boolean).join('%3B');
      const response = await axios.get(
        `${apiBaseUrl}/api/v1/maintenance_services?filters=${filters}&limit=${pagination.limit}&offset=${pagination.offset}&include_fields=car`,
        config
      );

      setMaintenanceServices(response.data.maintenance_services);
      setTotalItems(response.data.meta.total);
    } catch (error) {
      console.error('Error al obtener servicios de mantenimiento', error);
    }
  }, [plateNumberFilter, statusFilter, pagination, apiBaseUrl]);

  useEffect(() => {
    fetchMaintenanceServices();
  }, [fetchMaintenanceServices]);

  const handlePlateNumberChange = (e) => {
    setPlateNumberFilter(e.target.value);
    setPagination({ limit: pageSize, offset: 0 }); // Reiniciar paginación al cambiar filtro
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination({ limit: pageSize, offset: 0 }); // Reiniciar paginación al cambiar filtro
  };

  const handlePaginationChange = (e) => {
    const newPageSize = e.target.value;
    setPageSize(newPageSize);
    setPagination({ limit: newPageSize, offset: 0 });
  };

  const handlePageNext = () => {
    setPagination((prev) => ({ ...prev, offset: prev.offset + pagination.limit }));
  };

  const handlePagePrev = () => {
    setPagination((prev) => ({ ...prev, offset: Math.max(0, prev.offset - pagination.limit) }));
  };

  const isNextDisabled = pagination.offset + pagination.limit >= totalItems;
  const isPrevDisabled = pagination.offset === 0;

  const handleDelete = async (serviceId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      };

      // Realizar solicitud DELETE
      await axios.delete(`${apiBaseUrl}/api/v1/maintenance_services/${serviceId}`, config);

      // Eliminar el servicio de la lista
      setMaintenanceServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );
      setTotalItems((prevTotal) => prevTotal - 1); // Actualizar el total de items
    } catch (error) {
      console.error('Error al eliminar el servicio de mantenimiento', error);
    }
  };

  return (
    <div>
      <h2>Servicios de Mantenimiento</h2>
      <button onClick={() => navigate('/maintenance_services/create')}>Agregar Servicio de Mantenimiento</button>
      <div>
        <label htmlFor="plate_number_filter">Buscar por Número de Placa:</label>
        <input
          type="text"
          id="plate_number_filter"
          value={plateNumberFilter}
          onChange={handlePlateNumberChange}
        />
      </div>

      <div>
        <label htmlFor="status_filter">Filtrar por Status:</label>
        <select id="status_filter" value={statusFilter} onChange={handleStatusChange}>
          <option value="">Todos los status</option>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="completed">Completado</option>
        </select>
      </div>

      <ul>
        {maintenanceServices.map((service) => (
          <li key={service.id}>
            <p><strong>ID:</strong> {service.id}</p>
            <p><strong>Placa: </strong>
              <Link to={`/cars/${service.car.id}`}>
                {service.car.plate_number}
              </Link>
            </p>
            <p><strong>Descripción:</strong> {service.description}</p>
            <p><strong>Fecha:</strong> {service.date}</p>
            <p><strong>Status:</strong> {service.status}</p>
            <button onClick={() => navigate(`/maintenance_services/${service.id}/edit`)}>Editar</button>
            <button onClick={() => handleDelete(service.id)}>Eliminar</button>
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

export default MaintenanceServices;
