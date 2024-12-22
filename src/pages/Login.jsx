import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/api/v1/login`, formData);
      const token = response.data.token;
      localStorage.setItem('token', token);

      toast.success('Inicio de sesión exitoso.');

      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error al iniciar sesión', error);

      toast.error('Error al iniciar sesión, por favor intenta de nuevo.');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      <button onClick={() => navigate(`/register`)}>Registarse</button>
    </div>
  );
};

export default Login;
