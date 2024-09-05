import Link from 'next/link';
import { fetchMovies } from './lib/api';
import { Movie } from './types/movie';
import ImageSlider from '../components/ImageSlider';

const HomePage = async () => {
  let movies: Movie[] = [];

  try {
    movies = await fetchMovies();
    console.log('Fetched Movies:', movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }

  // Get the first and second set of five movies
  const firstFiveMovies = movies.slice(0, 5);
  const secondFiveMovies = movies.slice(5, 10);

  return (
    <div>
      <div className="px-4 py-4 bg-gray-200 min-h-screen flex flex-col">
        <ImageSlider />

        <div className="overflow-x-auto w-full max-w-screen-lg mx-auto mt-8 flex-1 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-800">Recommended Movies</h1>
            <Link href="/allmovies" className="text-blue-500 font-semibold">
              See More
            </Link>
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {firstFiveMovies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${encodeURIComponent(movie.title)}/${movie.id}`}
              >
                <div
                  className="flex-shrink-0 w-48 h-64 bg-gray-100 rounded-md shadow-md overflow-hidden cursor-pointer"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-gray-700">{movie.title}</p>
                  <p className="text-gray-500">{movie.genre}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 mb-4">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/stream-leadin-web-collection-202210241242.png"
              alt="Recommended Movies"
              className="w-full h-auto rounded-md shadow-md"
            />
          </div>
          <p className='mt-16 text-xl font-bold'>The Best of Live Events</p>
          <div className="mt-2 flex space-x-9 overflow-x-auto">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/bmshp-desktop-amusement-park-collection-202404190106.png"
              alt="Amusement Park Collection"
              className="w-44 h-44 object-cover rounded-md shadow-md"
            />
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MzArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/workshop-and-more-web-collection-202211140440.png"
              alt="Workshop and More"
              className="w-44 h-44 object-cover rounded-md shadow-md"
            />
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MTArIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/bmshp-desktop-kids-collection-202404190106.png"
              alt="Kids Collection"
              className="w-44 h-44 object-cover rounded-md shadow-md"
            />
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-NTUrIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/comedy-shows-collection-202211140440.png"
              alt="Comedy Shows"
              className="w-44 h-44 object-cover rounded-md shadow-md"
            />
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:l-text,ie-MzUrIEV2ZW50cw%3D%3D,co-FFFFFF,ff-Roboto,fs-64,lx-48,ly-320,tg-b,pa-8_0_0_0,l-end:w-300/music-shows-collection-202211140440.png"
              alt="Music Shows"
              className="w-44 h-44 object-cover rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-4 bg-gray-800 flex flex-col">
        <div className="overflow-x-auto w-full max-w-screen-lg mx-auto">
          <div className="mb-2">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-banner-web-collection-202208191200.png"
              alt="Premiere Banner"
              className="w-full h-auto rounded-md shadow-md "
            />
          </div>
          <h1 className="text-xl font-bold text-white mt-6">Premieres</h1>
          <div className="flex justify-between items-center ">
          <p className='text-sm text-white '>Brand new releases every Friday</p>

            <Link href="/allmovies" className="text-red-500 text-sm">
              See More
            </Link>
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {secondFiveMovies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${encodeURIComponent(movie.title)}/${movie.id}`}
              >
                <div
                  className="flex-shrink-0 w-48 h-64 bg-gray-100 rounded-md shadow-md overflow-hidden cursor-pointer"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-white">{movie.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
