import { glowingStar, stopwatch, imdb } from '../assets/icons';
import { ReactComponent as Close } from '../assets/icons/Close.svg';

export default function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li className="watched-movie-item">
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>
            <img src={imdb} height={24} />
          </span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>
            <img src={glowingStar} height={24} />
          </span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>
            <img src={stopwatch} height={18} />
          </span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbId)}
        >
          <Close className="close-icon" />
        </button>
      </div>
    </li>
  );
}
