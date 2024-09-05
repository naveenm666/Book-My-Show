"use client";
import React, { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { fetchMovies, fetchTheaters, filterMoviesByLanguage } from '@/app/lib/api'; // Import the API functions
import { Movie } from '@/app/types/movie';
import { Theater } from '@/app/types/theater';
import Link from 'next/link';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMovies, setShowMovies] = useState<boolean>(true); // State to toggle between movies and theaters
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Telugu'); // State for language selection
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [searchResults, setSearchResults] = useState<(Movie | Theater)[]>([]); // State for search results

  // Function to handle data fetching
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all theaters
      const fetchedTheaters = await fetchTheaters();
      setTheaters(fetchedTheaters);

      // Fetch movies based on the selected language
      const fetchedMovies = await filterMoviesByLanguage(selectedLanguage);
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData(); // Fetch data when modal opens or language changes
    }
  }, [isOpen, selectedLanguage]); // Dependency array includes `selectedLanguage`

  useEffect(() => {
    if (searchQuery) {
      const results = (showMovies ? movies : theaters).filter(item => {
        const itemName = showMovies ? (item as Movie).title : (item as Theater).name;
        return itemName.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, showMovies, movies, theaters]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const closeModal = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full max-w-full max-h-full relative">
        <div className="bg-gray-200 p-4 flex items-center">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            <FaChevronLeft className="h-6 w-6" />
          </button>
          <div className="w-full flex items-center justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full max-w-2xl h-12 px-4 py-2 border border-gray-300 rounded-md text-sm bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
          </div>
          <button
            onClick={closeModal}
            className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-48 mb-2 p-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setShowMovies(true)}
                className={`px-4 rounded ${showMovies ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Movies
              </button>
              <button
                onClick={() => setShowMovies(false)}
                className={`px-4 rounded ${!showMovies ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Theaters
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedLanguage('Telugu')}
                className={`px-4 border rounded ${selectedLanguage === 'Telugu' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Telugu
              </button>
              <button
                onClick={() => setSelectedLanguage('Hindi')}
                className={`px-4 border rounded ${selectedLanguage === 'Hindi' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Hindi
              </button>
              <button
                onClick={() => setSelectedLanguage('English')}
                className={`px-4 border rounded ${selectedLanguage === 'English' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                English
              </button>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-auto px-48">
            {loading ? (
              <p className="text-center mt-4">Loading...</p>
            ) : (
              <>
                {searchQuery ? (
                  <div className="list-disc pl-5">
                    {searchResults.map((result) =>
                      'title' in result ? (
                        <p key={result.id} className="text-lg text-black mb-2">
                          <Link href={`/movie/${encodeURIComponent(result.title)}/${result.id}/theaters`} onClick={closeModal}>
                            {result.title}
                          </Link>
                        </p>
                      ) : (
                        <li key={result.id} className="text-lg text-black mb-2">
                          <Link href={`/theater/${encodeURIComponent(result.name)}/${result.id}`} onClick={closeModal}>
                            {result.name}
                          </Link>
                        </li>
                      )
                    )}
                  </div>
                ) : (
                  showMovies ? (
                    <div className="list-disc pl-5">
                      {movies.map((movie) => (
                        <p key={movie.id} className="text-lg text-black mb-2">
                          <Link href={`/movie/${encodeURIComponent(movie.title)}/${movie.id}/theaters`} onClick={closeModal}>
                            {movie.title}
                          </Link>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <ul className="list-disc pl-5">
                      {theaters.map((theater) => (
                        <li key={theater.id} className="text-lg text-black mb-2">
                          <Link href={`/theater/${encodeURIComponent(theater.name)}/${theater.id}`} onClick={closeModal}>
                            {theater.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
