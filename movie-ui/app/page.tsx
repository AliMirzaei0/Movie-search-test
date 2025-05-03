/** @jsxImportSource react */
"use client";
import React, { useState } from "react";

const TMDB_API_KEY = "e0bcee9cdbcf4dd4841f9a6c859a2603";

async function fetchMovieTrailer(query: string) {
  // Search for the movie
  const searchRes = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
  const searchData = await searchRes.json();
  if (!searchData.results || searchData.results.length === 0) return null;
  const movieId = searchData.results[0].id;

  // Get the trailer (YouTube)
  const videoRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
  );
  const videoData = await videoRes.json();
  const trailer = videoData.results?.find(
    (v: any) => v.site === "YouTube" && v.type === "Trailer"
  );
  return trailer ? trailer.key : null;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTrailerKey(null);
    const key = await fetchMovieTrailer(query);
    if (key) {
      setTrailerKey(key);
    } else {
      setError("No trailer found.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black pt-8">
      <form onSubmit={handleSearch} className="flex gap-2 mb-8 w-full max-w-xl">
        <input
          type="text"
          className="flex-1 p-2 rounded-l border border-gray-300 text-black"
          placeholder="Search for a movie..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-r font-semibold hover:bg-red-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {trailerKey && (
        <div className="w-full flex justify-center">
          <iframe
            className="w-full h-[70vh] max-w-5xl rounded shadow-lg"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
} 