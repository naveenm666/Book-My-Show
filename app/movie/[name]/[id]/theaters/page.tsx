// app/movie/[movietitle]/[id]/theaters/page.tsx

import { fetchTheatersByMovieId } from '../../../../lib/api';
import { MovieTheater } from '../../../../types/movietheater';

interface Props {
  params: {
    name: string;
    id: string;
  };
}

const TheatersPage = async ({ params }: Props) => {
  const { name, id } = params;
  const decodedTitle = decodeURIComponent(name); // Decode the URL-encoded movietitle

  let theaters: MovieTheater[] = [];

  try {
    theaters = await fetchTheatersByMovieId(id);
  } catch (error) {
    console.error('Error fetching theaters:', error);
  }

  if (!theaters.length) {
    return <div>No theaters found for this movie.</div>;
  }

  return (
    <div className="px-4 py-4 bg-gray-200 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        {/* Display the decoded movie title */}
        <h1 className="text-3xl font-bold mb-4">{decodedTitle}</h1>
        <h2 className="text-2xl font-semibold mb-4">Theaters Showing This Movie</h2>
        <ul>
          {theaters.map((theater) => {
            const showTimings = JSON.parse(theater.showTimings);

            return (
              <li key={theater.theater_id} className="mb-4 p-4 bg-white rounded shadow-md">
                <h3 className="text-xl font-semibold">{theater.theater.name}</h3>
                <p className="text-gray-600">Location: {theater.theater.location}</p>
                <p className="text-gray-600">
                  {showTimings.map((timing: { showTime: string; availableSeats: number }) => (
                    <button
                      key={timing.showTime}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      {timing.showTime}
                    </button>
                  ))}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TheatersPage;
