// import fetch from 'node-fetch';
import type { Movie, SearchResult } from './types';

const TMDB_API_KEY = process.env.TMDB_API_KEY || 'YOUR_TMDB_API_KEY';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovies(query: string): Promise<Movie[]> {
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch movies');
  const data = (await res.json()) as SearchResult;
  return data.results;
}

export async function getMovieTrailer(movieId: number): Promise<string | null> {
  const url = `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as any;
  const trailer = data.results?.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer');
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
} 