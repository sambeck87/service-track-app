import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import StatusFilter from '../components/StatusFilter';
import MaintenanceServiceList from '../components/MaintenanceServiceList';
import '../styles/elemets_list.css'

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
    setPagination({ limit: pageSize, offset: 0 });
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPagination({ limit: pageSize, offset: 0 });
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

      await axios.delete(`${apiBaseUrl}/api/v1/maintenance_services/${serviceId}`, config);

      setMaintenanceServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );
      setTotalItems((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error('Error al eliminar el servicio de mantenimiento', error);
    }
  };

  return (
    <div className='card'>
      <h2>Servicios de Mantenimiento</h2>
      <button onClick={() => navigate('/maintenance_services/create')}>Agregar Servicio de Mantenimiento</button>

      <SearchInput
        id="plate_number_filter"
        label="Buscar por Número de Placa"
        value={plateNumberFilter}
        onChange={handlePlateNumberChange}
      />

      <StatusFilter value={statusFilter} onChange={handleStatusChange} />

      <MaintenanceServiceList
        maintenanceServices={maintenanceServices}
        navigate={navigate}
        handleDelete={handleDelete}
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

export default MaintenanceServices;
