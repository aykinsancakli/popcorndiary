import { number } from '../assets/icons';

export default function WatchedMoviesButton({
  onOpenSectionWatched,
  error,
  watched,
  query,
}) {
  return (
    !error &&
    Boolean(watched.length) && (
      <button
        className={`watched-movies-btn  ${query.length < 3 ? 'watched-darker' : 'result-intro-animate'}`}
        onClick={() => onOpenSectionWatched()}
      >
        <img src={number} height={22} /> WATCHED{' '}
        <span className="watched-num">{watched.length}</span>
      </button>
    )
  );
}
