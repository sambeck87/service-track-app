import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Cargar los autos desde la API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        };

        const response = await axios.get(`${apiBaseUrl}/api/v1/cars`, config);
        setCars(response.data.cars);
      } catch (error) {
        console.error('Error al obtener autos', error);
      }
    };

    fetchCars();
  }, [apiBaseUrl]);

  // Navegar a la página de creación de autos
  const handleAddCar = () => {
    navigate('/cars/create');
  };

  // Eliminar un carro después de la confirmación
  const handleDeleteCar = async (carId) => {
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este carro?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        };

        // Realiza la solicitud DELETE para eliminar el carro
        await axios.delete(`${apiBaseUrl}/api/v1/cars/${carId}`, config);

        // Actualiza el estado eliminando el carro de la lista
        setCars(cars.filter(car => car.id !== carId));
      } catch (error) {
        console.error('Error al eliminar el carro', error);
      }
    }
  };

  return (
    <div>
      <h2>Lista de Autos</h2>
      <button onClick={handleAddCar}>Agregar Auto</button>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            <a href={`/cars/${car.id}`}>{car.year} - {car.model} - {car.plate_number}</a>
            <button onClick={() => handleDeleteCar(car.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cars;
