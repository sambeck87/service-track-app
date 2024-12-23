import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/forms.css'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user: {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      },
    };

    try {
      const response = await axios.post(`${apiBaseUrl}/api/v1/users`, userData);
      console.log('Usuario creado', response.data);
      toast.success('Usuario creado exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al crear usuario', error);
      toast.error('Error al crear el usuario');
    }
  };

  return (
    <div className='form-card'>
      <h2>Registrar Usuario</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-inputs">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="off"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            autoComplete="new-password"
            required
          />
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="Confirmar Contraseña"
            autoComplete="new-password"
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <button onClick={() => navigate(`/login`)}>Ya tengo una cuenta</button>
    </div>
  );
};

export default Register;
