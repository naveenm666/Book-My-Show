export interface Movie {
    id: number;
    title: string;
    releaseDate: string; // Or Date, depending on how you handle dates
    genre: string;
    description?: string;
    poster: string;
    imdbRating: number;
    duration: string;
    certificate: string;
    language: string;
  }
 