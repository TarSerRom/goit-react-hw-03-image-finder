import PropTypes from 'prop-types';
import './Button.css'

export default function Button({ loadMore }) {
  return (
    <button className="Button" type="button" onClick={loadMore}>
      Load more
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
};