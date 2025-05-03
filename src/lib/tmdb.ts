import fetch from "node-fetch";

// your TMDB v3 key goes between the quotes
const API_KEY = "e0bcee9cdbcf4dd4841f9a6c859a2603";

export async function searchMovies(query: string) {
  const url =
    `https://api.themoviedb.org/3/search/movie?` +
    `api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = (await res.json()) as {
    results: { id: number; title: string }[];
  };
  return data.results.slice(0, 5);
}