import { useState, useEffect } from 'react';

import ConfirmationPopup from './ConfirmationPopup';
import WatchedMovie from './WatchedMovie';

export default function WatchedMovieList({
  watched,
  onDeleteWatched,
  onDeleteAll,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState(''); // Default sorting by IMDb rating
  const [filteredWatched, setFilteredWatched] = useState([]);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    const filtered = watched.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredWatched(filtered);
  }, [watched, searchQuery]);

  useEffect(() => {
    const filtered = watched.filter((movie) => {
      const titleMatch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const genreMatch =
        selectedGenre === '' ||
        movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      return titleMatch && genreMatch;
    });
    setFilteredWatched(filtered);
  }, [watched, searchQuery, selectedGenre]);

  // Function to handle sorting
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Function to sort movies based on selected criteria
  const sortMovies = (movies) => {
    switch (sortBy) {
      case 'imdbRating':
        return movies.slice().sort((a, b) => b.imdbRating - a.imdbRating);
      case 'userRating':
        return movies.slice().sort((a, b) => b.userRating - a.userRating);
      case 'duration':
        return movies.slice().sort((a, b) => b.runtime - a.runtime);
      default:
        return movies; // Return unsorted movies if sortBy is empty
    }
  };

  // Function to handle deleting all watched movies
  const handleDeleteAllConfirmed = () => {
    onDeleteAll();
    setIsConfirmationOpen(false);
  };

  return (
    <div className="watched-list-container">
      <input
        type="text"
        placeholder="Search watched movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-watched"
      />
      <select
        className="select-genre"
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
        <option value="crime">Crime</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="thriller">Thriller</option>
        <option value="horror">Horror</option>
        <option value="mystery">Mystery</option>
        <option value="sci-fi">Sci-Fi</option>
      </select>
      <select className="sort-by" value={sortBy} onChange={handleSortChange}>
        <option value="">Last Added</option>
        <option value="imdbRating">IMDb Rating</option>
        <option value="userRating">Your Rating</option>
        <option value="duration">Duration</option>
      </select>

      <button
        className="btn-delete-all"
        onClick={() => setIsConfirmationOpen(true)}
      >
        Delete all
      </button>

      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onCancel={() => setIsConfirmationOpen(false)}
        onConfirm={handleDeleteAllConfirmed}
      />

      <ul className="list">
        {sortMovies(filteredWatched).map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbId}
            onDeleteWatched={onDeleteWatched}
          />
        ))}
      </ul>
    </div>
  );
}
