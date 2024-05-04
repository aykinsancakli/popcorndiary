import { useState } from 'react';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

import BoxHeader from './components/BoxHeader';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import Logo from './components/Logo';
import Main from './components/Main';
import MainBox from './components/MainBox';
import MovieDetails from './components/MovieDetails';
import NavBar from './components/NavBar';
import NumResults from './components/NumResults';
import Search from './components/Search';
import WatchedMovieList from './components/WatchedMovieList';
import WatchedMoviesButton from './components/WatchedMoviesButton';
import WatchedSummary from './components/WatchedSummary';
import MovieList from './components/MovieList';

import { ReactComponent as Chevron } from './assets/icons/ChevronDown.svg';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [moveRight, setMoveRight] = useState(false);
  const [isSectionWatched, setIsSectionWatched] = useState(false);
  const [isSectionDetails, setIsSectionDetails] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleToggle() {
    setIsOpen((open) => !open);
    setMoveRight(false);
  }

  function handleSelectMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
    setMoveRight(true);
    setIsSectionDetails(false);
  }

  function handleOpenSectionWatched() {
    setIsSectionWatched((isSectionWatched) => !isSectionWatched);
    setMoveRight(false);
    setIsSectionDetails(true);
  }

  function handleDeleteWatched(id) {
    if (watched.length <= 1) setIsSectionWatched(false);
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteAll() {
    setWatched([]);
    setIsSectionWatched(false);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search
          query={query}
          setQuery={setQuery}
          setMoveRight={setMoveRight}
          selectedId={selectedId}
          isSectionWatched={isSectionWatched}
        />
      </NavBar>

      <Main>
        <BoxHeader>
          <NumResults
            movies={movies}
            query={query}
            error={error}
            selectedId={selectedId}
            isSectionWatched={isSectionWatched}
          />
          <WatchedMoviesButton
            onOpenSectionWatched={handleOpenSectionWatched}
            error={error}
            watched={watched}
            query={query}
          />
        </BoxHeader>

        <MainBox isOpen={isOpen}>
          {query.length < 3 && !isSectionWatched && (
            <div className="welcome-screen">&nbsp;</div>
          )}

          {!error && !selectedId && query.length >= 3 && !isSectionWatched && (
            <button className="btn-toggle" onClick={() => handleToggle()}>
              <Chevron
                className={`chevron ${isOpen ? 'up green' : 'down red'}`}
                width={32}
              />
            </button>
          )}

          {isLoading && !selectedId && <Loader />}

          {!isLoading && !error && !selectedId && !isSectionWatched && (
            <MovieList
              movies={movies}
              isOpen={isOpen}
              onSelectMovie={handleSelectMovie}
              moveRight={moveRight}
              watched={watched}
            />
          )}

          {error && <ErrorMessage message={error} />}

          {selectedId && isOpen && !isSectionWatched && (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              onOpenSectionWatched={handleOpenSectionWatched}
              watched={watched}
              isSectionDetails={isSectionDetails}
            />
          )}

          {isSectionWatched && !error && (
            <>
              <WatchedSummary
                watched={watched}
                onOpenSectionWatched={handleOpenSectionWatched}
              />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
                onDeleteAll={handleDeleteAll}
              />
            </>
          )}
        </MainBox>
      </Main>
    </>
  );
}
