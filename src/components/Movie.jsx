import { glowingStar, calendarClock } from '../assets/icons';

export default function Movie({ movie, onSelectMovie, watched }) {
  const isWatched = watched?.some(
    (watchedMovie) => watchedMovie.imdbId === movie.imdbID
  );

  const watchedMovie = watched?.find(
    (watchedMovie) => watchedMovie.imdbId === movie.imdbID
  );

  const posterAlt = movie.Poster === 'N/A' ? '🚫' : `${movie.Title} poster`;

  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img className="movie-poster" src={movie.Poster} alt={posterAlt} />
      <h3>
        {movie.Title}
        {isWatched && (
          <span className="user-rating">
            Rated {watchedMovie.userRating}{' '}
            <img src={glowingStar} className="user-rated-star" />
          </span>
        )}
      </h3>
      <div>
        <p>
          <span className="calendar">
            <img src={calendarClock} height={20} />
          </span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
