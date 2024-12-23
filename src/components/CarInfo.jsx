import Button from './Button';

import PropTypes from 'prop-types';

const CarInfo = ({ car, carId, navigate }) => {
  return (
    <div>
      <h2>{car.model} - {car.plate_number}</h2>
      <p>Año: {car.year}</p>
      <Button onClick={() => navigate(`/cars/${carId}/edit`)}>Editar</Button>
    </div>
  );
};

CarInfo.propTypes = {
  car: PropTypes.shape({
    model: PropTypes.string.isRequired,
    plate_number: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  carId: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default CarInfo;
