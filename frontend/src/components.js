import React, { useState } from 'react';

// Header Component with AnimeKAI branding
export const Header = ({ onSearch, onLogoClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-black bg-opacity-50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <div className="text-3xl font-bold">
              <span className="text-orange-400">Anime</span>
              <span className="text-green-400">KAI</span>
              <span className="text-yellow-300 ml-1">⚡</span>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime..."
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-full border border-gray-600 focus:border-orange-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Social Media Buttons */}
          <div className="flex space-x-2">
            <SocialButton platform="facebook" count="4.6k" />
            <SocialButton platform="twitter" count="3.3k" />
            <SocialButton platform="discord" count="1.4k" />
            <SocialButton platform="reddit" count="10k" />
            <SocialButton platform="whatsapp" count="1.3k" />
            <SocialButton platform="telegram" count="2.1k" />
          </div>
        </div>
      </div>
    </header>
  );
};

// Social Media Button Component
const SocialButton = ({ platform, count }) => {
  const colors = {
    facebook: 'bg-blue-600 hover:bg-blue-700',
    twitter: 'bg-black hover:bg-gray-800',
    discord: 'bg-indigo-600 hover:bg-indigo-700',
    reddit: 'bg-red-600 hover:bg-red-700',
    whatsapp: 'bg-green-600 hover:bg-green-700',
    telegram: 'bg-blue-500 hover:bg-blue-600'
  };

  return (
    <button className={`${colors[platform]} text-white px-3 py-1 rounded-full text-xs transition-colors duration-200`}>
      {count}
    </button>
  );
};

// Hero Section Component
export const Hero = ({ featuredAnime, onPlay }) => {
  return (
    <section 
      className="relative h-96 bg-cover bg-center"
      style={{ backgroundImage: `url(${featuredAnime.banner})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl font-bold mb-4">{featuredAnime.title}</h1>
          <p className="text-lg mb-6">{featuredAnime.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">
              ⭐ {featuredAnime.rating}
            </span>
            <span className="text-sm">{featuredAnime.year}</span>
            <span className="text-sm">{featuredAnime.episodes} Episodes</span>
            <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
              {featuredAnime.status}
            </span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => onPlay(featuredAnime)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              ▶️ Watch Now
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
              ℹ️ More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Anime Grid Component
export const AnimeGrid = ({ animeList, onAnimeSelect, categories }) => {
  const [activeCategory, setActiveCategory] = useState('Popular');

  const filterAnimeByCategory = (category) => {
    switch(category) {
      case 'Latest':
        return animeList.filter(anime => anime.year >= 2020);
      case 'Action':
        return animeList.filter(anime => anime.genre.includes('Action'));
      case 'Romance':
        return animeList.filter(anime => anime.genre.includes('Romance'));
      case 'Comedy':
        return animeList.filter(anime => anime.genre.includes('Comedy'));
      default:
        return animeList.sort((a, b) => b.rating - a.rating);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Category Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 ${
              activeCategory === category
                ? 'bg-orange-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filterAnimeByCategory(activeCategory).map(anime => (
          <AnimeCard 
            key={anime.id} 
            anime={anime} 
            onSelect={() => onAnimeSelect(anime)} 
          />
        ))}
      </div>
    </section>
  );
};

// Anime Card Component
const AnimeCard = ({ anime, onSelect }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={onSelect}
    >
      <div className="relative">
        <img 
          src={anime.thumbnail} 
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          ⭐ {anime.rating}
        </div>
        <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
          EP {anime.episodes}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-2 truncate">{anime.title}</h3>
        <div className="flex flex-wrap gap-1 mb-2">
          {anime.genre.slice(0, 2).map(g => (
            <span key={g} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
              {g}
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-xs">{anime.year}</p>
      </div>
    </div>
  );
};

// Search Results Component
export const SearchResults = ({ results, onAnimeSelect }) => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-white text-2xl font-bold mb-8">
        Search Results ({results.length})
      </h2>
      {results.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p>No anime found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map(anime => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
              onSelect={() => onAnimeSelect(anime)} 
            />
          ))}
        </div>
      )}
    </section>
  );
};

// Anime Detail Component
export const AnimeDetail = ({ anime, onPlay, onBack }) => {
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  
  // Generate episode list
  const episodes = Array.from({ length: Math.min(anime.episodes, 24) }, (_, i) => i + 1);

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="text-white mb-6 hover:text-orange-400 transition-colors"
      >
        ← Back to Home
      </button>

      {/* Anime Info */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="md:flex">
          <img 
            src={anime.thumbnail} 
            alt={anime.title}
            className="w-full md:w-80 h-96 object-cover"
          />
          <div className="p-8 flex-1">
            <h1 className="text-white text-4xl font-bold mb-4">{anime.title}</h1>
            <p className="text-gray-300 text-lg mb-6">{anime.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400">Rating</p>
                <p className="text-white text-xl">⭐ {anime.rating}</p>
              </div>
              <div>
                <p className="text-gray-400">Episodes</p>
                <p className="text-white text-xl">{anime.episodes}</p>
              </div>
              <div>
                <p className="text-gray-400">Year</p>
                <p className="text-white text-xl">{anime.year}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p className="text-white text-xl">{anime.status}</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-400 mb-2">Genres</p>
              <div className="flex flex-wrap gap-2">
                {anime.genre.map(g => (
                  <span key={g} className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onPlay(anime)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              ▶️ Watch Episode {selectedEpisode}
            </button>
          </div>
        </div>

        {/* Episode List */}
        <div className="p-8 border-t border-gray-700">
          <h3 className="text-white text-xl font-bold mb-4">Episodes</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
            {episodes.map(ep => (
              <button
                key={ep}
                onClick={() => setSelectedEpisode(ep)}
                className={`p-2 rounded text-sm transition-colors ${
                  selectedEpisode === ep
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                EP {ep}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Video Player Component
export const VideoPlayer = ({ anime, onClose }) => {
  return (
    <section className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Player Header */}
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">{anime.title} - Episode 1</h2>
        <button 
          onClick={onClose}
          className="text-white hover:text-orange-400 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Video Player */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="w-full h-full max-w-6xl max-h-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${anime.videoId}?autoplay=1&rel=0&showinfo=0&controls=1`}
            title={anime.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Player Controls */}
      <div className="bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-orange-400">⏮️ Previous</button>
          <button className="text-white hover:text-orange-400">▶️ Play/Pause</button>
          <button className="text-white hover:text-orange-400">⏭️ Next</button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-orange-400">⚙️ Settings</button>
          <button className="text-white hover:text-orange-400">🔊 Volume</button>
          <button className="text-white hover:text-orange-400">⛶ Fullscreen</button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold">
                <span className="text-orange-400">Anime</span>
                <span className="text-green-400">KAI</span>
                <span className="text-yellow-300 ml-1">⚡</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for anime streaming. Watch thousands of anime series and movies in HD quality.
            </p>
            <div className="flex space-x-4">
              <img 
                src="https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg" 
                alt="Anime characters" 
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Popular Anime</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Latest Episodes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Movies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Random</a></li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Genres</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Action</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Adventure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Romance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Comedy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">Drama</a></li>
            </ul>
          </div>

          {/* Alternative Domains */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Alternative Domains</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-400">📱 animekai.to/home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">📱 animekai.bz</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">📱 animekai.cc</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-400">📱 animekai.ac</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 AnimeKAI. All rights reserved. | 
            <span className="text-orange-400"> Streaming anime since 2020</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            This is a demo replica for educational purposes. All anime content is linked to official sources.
          </p>
        </div>
      </div>
    </footer>
  );
};