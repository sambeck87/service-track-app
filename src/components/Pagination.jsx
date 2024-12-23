import Button from './Button';
import PropTypes from 'prop-types';

const Pagination = ({
  handlePagePrev,
  handlePageNext,
  isPrevDisabled,
  isNextDisabled,
  handlePaginationChange,
  pageSize,
}) => {
  return (
    <div>
      <label>Paginación:</label>
      <select onChange={handlePaginationChange} value={pageSize}>
        <option value="10">10 elementos</option>
        <option value="50">50 elementos</option>
        <option value="100">100 elementos</option>
      </select>

      <div>
        <Button onClick={handlePagePrev} disabled={isPrevDisabled}>
          Anterior
        </Button>
        <Button onClick={handlePageNext} disabled={isNextDisabled}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  handlePagePrev: PropTypes.func.isRequired,
  handlePageNext: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
  pageSize: PropTypes.oneOf([10, 50, 100]).isRequired,
};

export default Pagination;

