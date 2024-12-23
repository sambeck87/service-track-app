
import PropTypes from 'prop-types';

const StatusFilter = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="status_filter">Filtrar por Status:</label>
      <select id="status_filter" value={value} onChange={onChange}>
        <option value="">Todos los status</option>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completado</option>
      </select>
    </div>
  );
};

StatusFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default StatusFilter;
