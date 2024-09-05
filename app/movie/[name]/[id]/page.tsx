// app/movies/[title]/[id]/page.tsx
import { fetchMovieById } from '../../../lib/api';
import { Movie } from '../../../types/movie';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

const MovieDetailPage = async ({ params }: Props) => {
  const { id  } = params;
  
  let movie: Movie | null = null;

  try {
    movie = await fetchMovieById(id);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }
  
  const languages = movie.language.split(',').map(lang => lang.trim());
  const releaseDate = new Date(movie.releaseDate);
  const day = releaseDate.getDate();
  const month = releaseDate.toLocaleString('en-US', { month: 'short' }); // 'Aug'
  const year = releaseDate.getFullYear();
  const formattedReleaseDate = `${day} ${month} ${year}`;

  return (
    <div>
      <div className="px-4 py-4" style={{ 
        backgroundImage: `url(${movie.poster})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px', 
        backgroundRepeat: 'no-repeat' 
        }}>
        <div className="bg-gray-900 bg-opacity-60 p-9 rounded-lg max-w-screen-lg mx-auto flex items-start">
          <div className="flex-shrink-0 w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <div className="md:ml-10 text-white">
            <h1 className="text-3xl font-bold mt-8">{movie.title}</h1>
            <div className="mt-4 bg-gray-800 p-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <p className="text-lg font-semibold">{movie.imdbRating}/10</p>
              </div>
              <Link href={`/movie/${encodeURIComponent(movie.title)}/${id}/rate`} className="bg-white text-black py-1 px-2 rounded">
                Rate Now
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <span key={index} className="bg-white text-black px-3 py-1 rounded-lg">
                  {language}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm font-bold">
              <span>{movie.duration}</span> • <span>{movie.genre}</span> • <span>{movie.certificate}</span> • <span>{formattedReleaseDate}</span>   
            </p>          {/* Button to navigate to theaters associated with the movie */}
            <div className="mt-6">
              <Link
                href={`/movie/${encodeURIComponent(movie.title)}/${id}/theaters`} // Correct URL structure
                className="bg-red-500 text-white py-3 px-6 rounded-lg text-lg font-semibold"
              >
                Book Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 max-w-screen-lg mx-auto text-white">
        <p className="text-xl text-black font-bold">About The Movie</p>
        <p className="text-ml text-black">{movie.description}</p>
      </div>
    </div>
  );
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const movie = await fetchMovieById(params.id);
  return {
    title: movie.title,
    description: movie.description,
  };
}

export default MovieDetailPage;
