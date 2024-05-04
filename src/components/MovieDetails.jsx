import { useState, useEffect, useRef } from 'react';
import { useKey } from '../hooks/useKey';

import Loader from './Loader';
import StarRating from './StarRating';

import { glowingStar, imdb } from '../assets/icons';
import { ReactComponent as GoBack } from '../assets/icons/GoBack.svg';
import { ReactComponent as Save } from '../assets/icons/Save.svg';

// ------ API KEY ------
const KEY = '74c70d3b';

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  onOpenSectionWatched,
  watched,
  isSectionDetails,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const [trailer, setTrailer] = useState(null); // New state to hold trailer data

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isWatched = watched.some(
    (watchedMovie) => watchedMovie.imdbId === selectedId
  );

  const watchedUserRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      genre,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    // if (isWatched) return;
    onOpenSectionWatched();
  }

  useKey('Escape', onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res =
          await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}
`);
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(() => {
    async function getMovieTrailer() {
      setIsLoading(true);
      const res = await fetch(
        `https://api.kinocheck.de/movies?imdb_id=${selectedId}&categories=Trailer`
      );
      const data = await res.json();
      setIsLoading(false);
      if (data) {
        // Check if the trailer data exists and set it in the state
        if (data.trailer) {
          setTrailer(data.trailer);
        }
      }
    }
    getMovieTrailer();
  }, [selectedId]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `MOVIE | ${title}`;

      return function () {
        document.title = 'PopcornDiary | Search & Rate Movies';
      };
    },
    [title]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`details ${isSectionDetails ? 'blur-in' : 'move-left'}`}>
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          <GoBack />
        </button>
        <div className="poster-wrapper">
          <img
            className="movie-poster"
            src={poster}
            alt={`Poster of ${movie} movie`}
          />
        </div>
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}{' '}
          </p>
          <div className="details-genre-imdb">
            <p>{genre}</p>
            <p className="rating-box">
              <img src={imdb} alt="rating" className="details-imdb-rating" />{' '}
              <span className="imdb-rating-num">{imdbRating}</span>
            </p>
          </div>
        </div>
      </header>

      <section>
        <p className="rating-description">
          {watchedUserRating
            ? `${title} is already on your list.`
            : 'Rate this movie to add it to your list.'}
        </p>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                className="star-rating"
                onSetRating={setUserRating}
              />

              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  <Save /> Add to list
                </button>
              )}
            </>
          ) : (
            <p className="rated-text">
              <span>
                You rated this movie{' '}
                <span className="rated-num">{watchedUserRating}</span>
              </span>
              <span>
                <img src={glowingStar} className="rated-star" />
              </span>
            </p>
          )}
        </div>

        <p className="plot">
          <em>{plot}</em>
        </p>
        {trailer && ( // Conditionally render the trailer button if it exists
          <button
            className="btn-trailer"
            onClick={() =>
              window.open(
                `https://www.youtube.com/watch?v=${trailer.youtube_video_id}`,
                '_blank'
              )
            }
          >
            Watch Trailer
          </button>
        )}
        <p className="actors">Starring {actors}</p>
        <p className="director">Directed by {director}</p>
      </section>
    </div>
  );
}
