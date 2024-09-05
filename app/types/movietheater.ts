// types/theater.ts
export interface MovieTheater {
    theater_id: number;
    movie_id: number;
    showTimings: string; // Originally a JSON string
    movie: {
      id: number;
      title: string;
      releaseDate: string;
      genre: string;
      description?: string;
      poster: string;
      imdbRating: number;
      duration: string;
      certificate: string;
      language: string;
    };
    theater: {
      id: number;
      name: string;
      location: string;
      capacity: number;
    };
  }
  