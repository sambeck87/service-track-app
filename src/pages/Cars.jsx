import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';
import '../styles/elemets_list.css'

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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

  const handleAddCar = () => {
    navigate('/cars/create');
  };

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

        await axios.delete(`${apiBaseUrl}/api/v1/cars/${carId}`, config);

        setCars(cars.filter(car => car.id !== carId));
      } catch (error) {
        console.error('Error al eliminar el carro', error);
      }
    }
  };

  return (
    <div className='card'>
      <h2>Lista de Autos</h2>
      <Button onClick={handleAddCar}>Agregar Auto</Button>
      <ul>
        {cars.map((car) => (
          <li className='list-element' key={car.id}>
            <a href={`/cars/${car.id}`}>{car.year} - {car.model} - {car.plate_number}</a>
            <Button onClick={() => handleDeleteCar(car.id)}>Eliminar</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cars;
