import axios from 'axios';
import { Movie } from '../types/movie';
import { MovieTheater } from '../types/movietheater';
import { Theater } from '../types/theater';



const API_URL = 'http://localhost:3001'; // Update with your Express server URL

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get<Movie[]>(`${API_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export async function filterMoviesByLanguage(language: string): Promise<Movie[]> {
  try {
    const response = await axios.get<Movie[]>(`${API_URL}/movies`);
    const allMovies: Movie[] = response.data;

    // Filter movies based on language
    return allMovies.filter(movie => movie.language.split(',').includes(language));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

// lib/api.ts
export const fetchTheatersByMovieId = async (movieId: string): Promise<MovieTheater[]> => {
  const response = await fetch(`http://localhost:3001/movie-theaters/movie/${movieId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch theaters');
  }

  return response.json();
};

export const fetchTheaters = async (): Promise<Theater[]> => {
  try {
    const response = await axios.get<Theater[]>(`${API_URL}/theaters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching theaters:', error);
    throw error;
  }
};

export const fetchMoviesByTheaterId = async (theaterId: number): Promise<MovieTheater[]> => {
  try {
    const response = await axios.get(`http://localhost:3001/movie-theaters/theater/${theaterId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by theater ID:', error);
    throw new Error('Failed to fetch movies');
  }
};


export const fetchMoviesTheaters = async (): Promise<MovieTheater[]> => {
  try {
    const response = await axios.get<MovieTheater[]>(`${API_URL}/movies-theaters`);
    return response.data;
  } catch (error) {
    console.error('Error fetching theaters:', error);
    throw error;
  }
};

