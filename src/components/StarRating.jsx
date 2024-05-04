import { useState } from 'react';
import PropTypes from 'prop-types';

// -------- STAR ICONS --------
import { ReactComponent as StarFull } from '../assets/icons/StarFull.svg';
import { ReactComponent as StarEmpty } from '../assets/icons/StarEmpty.svg';
// ----------------------------

// -------- CONTAINER STYLES --------
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};
// ---------------------------------

// -------- PROP TYPES --------
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
};
// ---------------------------------

// -------- STAR RATING COMPONENT --------
export default function StarRating({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
}
// ---------------------------------------

// -------- STAR --------
function Star({ onRate, onHoverIn, onHoverOut, full, color, size }) {
  const starEmptyStyle = {
    width: `${size}px`,
    height: `${size} px`,
    cursor: 'pointer',
    stroke: color,
  };

  const starFullStyle = {
    width: `${size}px`,
    height: `${size}px`,
    cursor: 'pointer',
    fill: color,
    stroke: color,
  };

  return (
    <span
      role="button"
      style={starFullStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <StarFull style={starFullStyle} />
      ) : (
        <StarEmpty style={starEmptyStyle} />
      )}
    </span>
  );
}
// ----------------------
