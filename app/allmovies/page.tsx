// app/movies/page.tsx
import { fetchMovies } from '../lib/api';
import { Movie } from '../types/movie';
import ImageSlider from '@/components/ImageSlider';
import Link from 'next/link';

const AllMoviesPage = async () => {
  let movies: Movie[] = [];

  try {
    movies = await fetchMovies();
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

  return (
    <div className="px-4 py-4 bg-gray-200 flex flex-col">
      <div className="overflow-x-auto w-full max-w-screen-lg mx-auto">
        <div className="mb-2">
          <ImageSlider />
        </div>
        <h1 className="text-xl font-bold text-black mt-6">All Movies</h1>
        <div className="flex justify-between items-center">
          <p className="text-sm text-black">Browse our complete collection</p>
          
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          {/* Sidebar (3 columns) */}
          <div className="col-span-3 bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Sidebar</h2>
            {/* Add sidebar content here */}
          </div>

          {/* Movies Grid (9 columns) */}
          <div className="col-span-9">
            <div className="grid grid-cols-4 gap-4">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${encodeURIComponent(movie.title)}/${movie.id}/theaters`}
                >
                  <div className="w-full h-64 bg-gray-100 rounded-md shadow-md overflow-hidden cursor-pointer">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-2 text-center">
                      <p className="font-semibold text-sm">{movie.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMoviesPage;
