import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CarInfo from '../components/CarInfo';
import MaintenanceServiceList from '../components/MaintenanceServiceList';
import Pagination from '../components/Pagination';
import StatusFilter from '../components/StatusFilter';
import '../styles/elemets_list.css'

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

        await axios.delete(`${apiBaseUrl}/api/v1/maintenance_services/${serviceId}`, config);

        setMaintenanceServices(maintenanceServices.filter(service => service.id !== serviceId));
      } catch (error) {
        console.error('Error al eliminar el servicio de mantenimiento', error);
      }
    }
  };

  if (!car) return <div>Cargando detalles del auto...</div>;

  return (
    <div className='card'>
      <CarInfo car={car} navigate={navigate} carId={carId} />

      <button onClick={() => navigate(`/maintenance_services/create?car_id=${carId}`)}>
        Agregar Servicio de Mantenimiento
      </button>

      <StatusFilter
        value={statusFilter}
        onChange={handleStatusChange}
      />

      <MaintenanceServiceList
        maintenanceServices={maintenanceServices}
        navigate={navigate}
        handleDelete={handleDeleteMaintenanceService}
      />

      <Pagination
        handlePagePrev={handlePagePrev}
        handlePageNext={handlePageNext}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        handlePaginationChange={handlePaginationChange}
        pageSize={pageSize}
      />
    </div>
  );
};

export default CarDetails;
