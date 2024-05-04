import { imdb, glowingStar, stopwatch, number } from '../assets/icons';
import { ReactComponent as GoBack } from '../assets/icons/GoBack.svg';

// ------ AVERAGE CALCULATOR FUNCTION ------
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedSummary({ watched, onOpenSectionWatched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className={`summary`}>
      <button className="btn-back" onClick={() => onOpenSectionWatched()}>
        <GoBack />
      </button>
      <div>
        <p>
          <span>
            <img src={number} height={29} />
          </span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>
            <img src={imdb} height={30} />
          </span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>
            <img src={glowingStar} height={30} />
          </span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>
            <img src={stopwatch} height={22} />
          </span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}
