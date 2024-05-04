import Movie from './Movie';

export default function MovieList({
  movies,
  isOpen,
  onSelectMovie,
  moveRight,
  watched,
}) {
  return (
    <ul
      className={`list list-movies ${isOpen ? 'blur-in' : 'list-up'} ${moveRight ? 'move-right' : ''}`}
    >
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          watched={watched}
        />
      ))}
    </ul>
  );
}
