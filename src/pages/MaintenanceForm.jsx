import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const MaintenanceForm = () => {
  const [formData, setFormData] = useState({
    car_id: '',
    status: '',
    description: '',
    date: '',
  });

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    };

    const carIdParam = searchParams.get('car_id');
    if (!id && carIdParam && !formData.car_id) {
      setFormData((prevState) => ({
        ...prevState,
        car_id: carIdParam,
      }));
    }

    if (id) {
      const fetchMaintenance = async () => {
        try {
          const response = await axios.get(`${apiBaseUrl}/api/v1/maintenance_services/${id}`, { headers });
          setFormData({
            car_id: response.data.maintenance_service.car_id,
            status: response.data.maintenance_service.status,
            description: response.data.maintenance_service.description,
            date: response.data.maintenance_service.date,
          });
        } catch (error) {
          console.error('Error al cargar el mantenimiento', error);
        }
      };
      fetchMaintenance();
    }
  }, [id, searchParams, formData.car_id, apiBaseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = id
      ? `${apiBaseUrl}/api/v1/maintenance_services/${id}`
      : `${apiBaseUrl}/api/v1/maintenance_services`;

    const method = id ? 'PUT' : 'POST';

    const requestData = {
      maintenance_service: {
        car_id: formData.car_id,
        description: formData.description,
        status: formData.status,
        date: formData.date,
      },
    };

    try {
      const response = await axios({
        method,
        url: endpoint,
        data: requestData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Mantenimiento guardado exitosamente');
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      console.error('Error al guardar el mantenimiento', error);
      toast.error(`Error al guardar el mantenimiento: ${error.response?.data?.message || 'Error desconocido'}`);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Mantenimiento' : 'Crear Mantenimiento'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="car_id">Car ID:</label>
          <input
            type="text"
            id="car_id"
            name="car_id"
            value={formData.car_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Elija el status</option>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completado</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'} Mantenimiento</button>
      </form>
    </div>
  );
};

export default MaintenanceForm;
