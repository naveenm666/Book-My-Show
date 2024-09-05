import { fetchMoviesByTheaterId } from '@/app/lib/api';  // Adjust the import path as necessary
import { MovieTheater } from '@/app/types/movietheater';

interface Props {
  params: {
    id: string;
  };
}

const MoviesPage = async ({ params }: Props) => {
  const { id } = params;

  let movieTheaters: MovieTheater[] = [];

  try {
    movieTheaters = await fetchMoviesByTheaterId(Number(id));
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

  if (!movieTheaters.length) {
    return <div>No movies found for this theater.</div>;
  }

  return (
    <div className="px-4 py-4 bg-gray-200 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Movies in This Theater</h1>
        <ul>
          {movieTheaters.map((movieTheater) => {
            const { movie } = movieTheater;

            return (
              <li key={movie.id} className="mb-4 p-4 bg-white rounded shadow-md">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-gray-600">Genre: {movie.genre}</p>
                <p className="text-gray-600">Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
                <p className="text-gray-600">IMDB Rating: {movie.imdbRating}</p>
                <p className="text-gray-600">Duration: {movie.duration}</p>
                <p className="text-gray-600">Certificate: {movie.certificate}</p>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Show Timings:</h3>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(movieTheater.showTimings).map((timing: { showTime: string; availableSeats: number }) => (
                      <button
                        key={timing.showTime}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                      >
                        {timing.showTime} 
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MoviesPage;