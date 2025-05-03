import { NextRequest, NextResponse } from 'next/server';
import { searchMovies, getMovieTrailer } from '@/lib/tmdb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }
  try {
    const movies = await searchMovies(query);
    // Optionally, fetch trailers for each movie (not recommended for performance)
    // const moviesWithTrailers = await Promise.all(movies.map(async (movie) => ({
    //   ...movie,
    //   trailer: await getMovieTrailer(movie.id),
    // })));
    return NextResponse.json({ results: movies });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
} 