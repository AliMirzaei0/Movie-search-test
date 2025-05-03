"use client";
import React, { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
}

const YOUTUBE_EMBED_URL = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1`;

async function fetchMovies(query: string): Promise<Movie[]> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results;
}

async function fetchTrailer(movieId: number): Promise<string | null> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=e0bcee9cdbcf4dd4841f9a6c859a2603`);
  if (!res.ok) return null;
  const data = await res.json();
  const trailer = data.results?.find((v: any) => v.site === "YouTube" && v.type === "Trailer");
  return trailer ? trailer.key : null;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoplayTrailer, setAutoplayTrailer] = useState<string | null>(null);

  useEffect(() => {
    document.title = "MovieTube";
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAutoplayTrailer(null);
    try {
      const results = await fetchMovies(query);
      setMovies(results);
      if (results.length > 0) {
        const trailerKey = await fetchTrailer(results[0].id);
        if (trailerKey) {
          setAutoplayTrailer(trailerKey);
        } else {
          setError("Trailer not found");
        }
      }
    } catch (err) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {autoplayTrailer && (
        <div className="w-full aspect-video mb-6 rounded overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            src={YOUTUBE_EMBED_URL(autoplayTrailer)}
            title="YouTube trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}
      <div className="grid gap-4">
        {movies.map((movie, idx) => (
          <div key={movie.id} className="flex gap-4 items-start bg-gray-100 rounded p-4">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-24 h-36 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>
              <p className="mb-2">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 