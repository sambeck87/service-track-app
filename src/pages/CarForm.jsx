import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CarForm = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState({ plate_number: '', model: '', year: '' });
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        try {
          const response = await axios.get(`${apiBaseUrl}/api/v1/cars/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCarData({
            plate_number: response.data.car.plate_number,
            model: response.data.car.model,
            year: response.data.car.year,
          });
        } catch (error) {
          console.error('Error al obtener auto', error);
          toast.error('Error al obtener auto');
        }
      };
      fetchCar();
    }
  }, [id, token,apiBaseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carPayload = {
      car: {
        plate_number: carData.plate_number,
        model: carData.model,
        year: carData.year,
      },
    };

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      if (id) {
        await axios.put(`${apiBaseUrl}/api/v1/cars/${id}`, carPayload, { headers });
        toast.success('Auto actualizado exitosamente');  // Notificación de éxito
      } else {
        await axios.post(`${apiBaseUrl}/api/v1/cars`, carPayload, { headers });
        toast.success('Auto creado exitosamente');  // Notificación de éxito
      }

      navigate('/');

    } catch (error) {
      console.error('Error al guardar el auto', error);
      toast.error('Error al guardar el auto');  // Notificación de error
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Auto' : 'Crear Auto'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="plate_number"
            value={carData.plate_number}
            onChange={handleChange}
            placeholder="Número de placa"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="model"
            value={carData.model}
            onChange={handleChange}
            placeholder="Modelo"
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="year"
            value={carData.year}
            onChange={handleChange}
            placeholder="Año"
            required
          />
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default CarForm;
