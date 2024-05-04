import { useEffect, useRef } from 'react';
import { magnifyingGlass } from '../assets/icons';

export default function Search({
  query,
  setQuery,
  setMoveRight,
  selectedId,
  isSectionWatched,
}) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      inputEl.current.focus();
      function callback(e) {
        if (e.code === 'Enter' && document.activeElement !== inputEl.current) {
          setQuery('');
        }
      }

      document.addEventListener('keydown', callback);

      return () => document.removeEventListener('keydown', callback);
    },
    [setQuery]
  );

  function handleSetQuery(e) {
    setQuery(e.target.value);
    setMoveRight(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    inputEl.current.blur();
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          className={`search ${selectedId || isSectionWatched ? 'disabled-search' : ''}`}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => handleSetQuery(e)}
          disabled={selectedId || isSectionWatched}
          ref={inputEl}
        />
        <button className="search-btn">
          <img
            src={magnifyingGlass}
            alt="magnifying glass icon"
            className="magnifying-glass-icon"
            height={28}
          />
        </button>
      </form>
    </div>
  );
}
