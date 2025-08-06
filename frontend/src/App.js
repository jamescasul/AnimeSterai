import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  Header, 
  Hero, 
  AnimeGrid, 
  AnimeDetail, 
  VideoPlayer, 
  Footer, 
  SearchResults 
} from './components.js';

// Mock anime data similar to popular anime streaming platforms
const mockAnimeData = [
  {
    id: 1,
    title: "Attack on Titan",
    episodes: 87,
    rating: 9.0,
    year: 2013,
    genre: ["Action", "Drama", "Fantasy"],
    description: "Humanity fights for survival against giant humanoid Titans.",
    thumbnail: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxhbmltZXxlbnwwfHx8fDE3NTQ0NzkwNTJ8MA&ixlib=rb-4.1.0&q=85",
    banner: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxhbmltZXxlbnwwfHx8fDE3NTQ0NzkwNTJ8MA&ixlib=rb-4.1.0&q=85",
    status: "Completed",
    videoId: "dQw4w9WgXcQ" // YouTube demo video
  },
  {
    id: 2,
    title: "Demon Slayer",
    episodes: 44,
    rating: 8.7,
    year: 2019,
    genre: ["Action", "Historical", "Supernatural"],
    description: "A young boy becomes a demon slayer to save his sister.",
    thumbnail: "https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg",
    banner: "https://images.pexels.com/photos/33322030/pexels-photo-33322030.jpeg",
    status: "Ongoing",
    videoId: "VQzLzJe_m70"
  },
  {
    id: 3,
    title: "One Piece",
    episodes: 1000,
    rating: 9.2,
    year: 1999,
    genre: ["Adventure", "Comedy", "Action"],
    description: "A young pirate searches for the ultimate treasure.",
    thumbnail: "https://images.unsplash.com/photo-1705831156575-a5294d295a31?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxtYW5nYXxlbnwwfHx8fDE3NTQ0NzkwNTd8MA&ixlib=rb-4.1.0&q=85",
    banner: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxhbmltZXxlbnwwfHx8fDE3NTQ0NzkwNTJ8MA&ixlib=rb-4.1.0&q=85",
    status: "Ongoing",
    videoId: "GQfBJ4xX2YE"
  },
  {
    id: 4,
    title: "Naruto",
    episodes: 720,
    rating: 8.4,
    year: 2002,
    genre: ["Action", "Adventure", "Martial Arts"],
    description: "A young ninja dreams of becoming the strongest ninja.",
    thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxhbmltZXxlbnwwfHx8fDE3NTQ0NzkwNTJ8MA&ixlib=rb-4.1.0&q=85",
    banner: "https://images.pexels.com/photos/1921336/pexels-photo-1921336.jpeg",
    status: "Completed",
    videoId: "1dy2zPPrKD0"
  },
  {
    id: 5,
    title: "My Hero Academia",
    episodes: 150,
    rating: 8.6,
    year: 2016,
    genre: ["Action", "School", "Superhero"],
    description: "In a world of superheroes, a quirkless boy pursues his dream.",
    thumbnail: "https://images.unsplash.com/photo-1531501410720-c8d437636169?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYXxlbnwwfHx8fDE3NTQ0NzkwNTd8MA&ixlib=rb-4.1.0&q=85",
    banner: "https://images.unsplash.com/photo-1709675577966-6231e5a2ac43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxtYW5nYXxlbnwwfHx8fDE3NTQ0NzkwNTd8MA&ixlib=rb-4.1.0&q=85",
    status: "Ongoing",
    videoId: "D5fYOnwYkj4"
  },
  {
    id: 6,
    title: "Jujutsu Kaisen",
    episodes: 24,
    rating: 8.9,
    year: 2020,
    genre: ["Action", "School", "Supernatural"],
    description: "Students fight cursed spirits in modern-day Japan.",
    thumbnail: "https://images.pexels.com/photos/1454906/pexels-photo-1454906.jpeg",
    banner: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxhbmltZXxlbnwwfHx8fDE3NTQ0NzkwNTJ8MA&ixlib=rb-4.1.0&q=85",
    status: "Ongoing",
    videoId: "4A_X-Dvl0ws"
  }
];

function App() {
  const [animeList] = useState(mockAnimeData);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    const results = animeList.filter(anime => 
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      anime.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(results);
    setIsSearching(true);
  };

  const handleAnimeSelect = (anime) => {
    setSelectedAnime(anime);
    setIsSearching(false);
  };

  const handlePlay = (anime) => {
    setSelectedAnime(anime);
    setIsPlaying(true);
  };

  const handleClosePlayer = () => {
    setIsPlaying(false);
  };

  const handleBackToHome = () => {
    setSelectedAnime(null);
    setIsSearching(false);
    setIsPlaying(false);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <BrowserRouter>
        <Header onSearch={handleSearch} onLogoClick={handleBackToHome} />
        
        {isPlaying && selectedAnime ? (
          <VideoPlayer anime={selectedAnime} onClose={handleClosePlayer} />
        ) : selectedAnime ? (
          <AnimeDetail anime={selectedAnime} onPlay={handlePlay} onBack={handleBackToHome} />
        ) : isSearching ? (
          <SearchResults results={searchResults} onAnimeSelect={handleAnimeSelect} />
        ) : (
          <>
            <Hero featuredAnime={animeList[0]} onPlay={handlePlay} />
            <AnimeGrid 
              animeList={animeList} 
              onAnimeSelect={handleAnimeSelect}
              categories={["Popular", "Latest", "Action", "Romance", "Comedy"]}
            />
          </>
        )}
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;