import { confetti, sadFace, circleDown } from '../assets/icons';

export default function NumResults({
  movies,
  error,
  query,
  selectedId,
  isSectionWatched,
}) {
  return (
    query.length >= 3 && (
      <div className="num-results result-intro-animate">
        {!selectedId && !error && movies.length > 0 && !isSectionWatched && (
          <span>
            <p>
              Top <strong>{movies.length}</strong> Results for
            </p>
            <span className="result-stat">
              {query[0].toUpperCase() + query.slice(1)}
              <img
                src={confetti}
                alt="confetti"
                className="confetti result-animation result-emoji"
              />
            </span>
          </span>
        )}
        {!selectedId && error && (
          <span>
            No Results for
            <span className="result-stat">
              {query[0].toUpperCase() + query.slice(1)}
              <img
                src={sadFace}
                alt="sad face"
                className="sad-face result-animation result-emoji"
              />
            </span>
          </span>
        )}
        {selectedId && !isSectionWatched && (
          <p className="movie-details-heading">
            Movie Details <img src={circleDown} alt="down arrow" />
          </p>
        )}

        {isSectionWatched && (
          <p className="movies-watched-heading">
            Movies You Watched <img src={circleDown} alt="down arrow" />
          </p>
        )}
      </div>
    )
  );
}
