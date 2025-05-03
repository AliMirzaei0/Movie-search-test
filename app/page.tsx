import Search from '../components/search';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700">MovieTube</h1>
        <p className="text-lg text-gray-600 mt-2">Search for movies and watch trailers instantly</p>
      </header>
      <main>
        <Search />
      </main>
    </div>
  );
}
