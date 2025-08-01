import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';

// Mock Turkish data
const mockTracks = [
  {
    id: 1,
    title: 'Kör Nokta',
    artist: 'Teoman',
    album: 'En Güzel Hikayem',
    duration: '4:12',
    image: 'https://images.unsplash.com/photo-1505672984986-b7c468c7a134?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDF8fHxibGFja3wxNzU0MDY0NTM2fDA&ixlib=rb-4.1.0&q=85',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 2,
    title: 'Gel',
    artist: 'Barış Manço',
    album: 'Klasikler',
    duration: '3:45',
    image: 'https://images.unsplash.com/photo-1580112646171-13522164ead4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxtdXNpYyUyMGFsYnVtfGVufDF8fHxibGFja3wxNzU0MDY0NTM2fDA&ixlib=rb-4.1.0&q=85',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 3,
    title: 'Yalnızlık',
    artist: 'Sezen Aksu',
    album: 'En Güzelleri',
    duration: '4:33',
    image: 'https://images.pexels.com/photos/7098114/pexels-photo-7098114.jpeg',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 4,
    title: 'Aşk',
    artist: 'Tarkan',
    album: 'Karma',
    duration: '3:28',
    image: 'https://images.pexels.com/photos/7605539/pexels-photo-7605539.jpeg',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    id: 5,
    title: 'Rüya',
    artist: 'Ajda Pekkan',
    album: 'Süperstar',
    duration: '3:55',
    image: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0MDY4ODg5fDA&ixlib=rb-4.1.0&q=85',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    id: 6,
    title: 'Sevda',
    artist: 'Müslüm Gürses',
    album: 'Sevda Kuşu',
    duration: '4:07',
    image: 'https://images.unsplash.com/photo-1510133744874-096621a0e01e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0MDY4ODg5fDA&ixlib=rb-4.1.0&q=85',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  }
];

const mockArtists = [
  {
    id: 1,
    name: 'Teoman',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxjb25jZXJ0fGVufDF8fHxibGFja3wxNzU0MDcxNjA1fDA&ixlib=rb-4.1.0&q=85',
    followers: '2,123,456',
    verified: true
  },
  {
    id: 2,
    name: 'Barış Manço',
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxjb25jZXJ0fGVufDF8fHxibGFja3wxNzU0MDcxNjA1fDA&ixlib=rb-4.1.0&q=85',
    followers: '5,987,123',
    verified: true
  },
  {
    id: 3,
    name: 'Sezen Aksu',
    image: 'https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxjb25jZXJ0fGVufDF8fHxibGFja3wxNzU0MDcxNjA1fDA&ixlib=rb-4.1.0&q=85',
    followers: '3,432,187',
    verified: true
  }
];

const mockAlbums = [
  {
    id: 1,
    title: 'En Güzel Hikayem',
    artist: 'Teoman',
    year: 2004,
    image: 'https://images.unsplash.com/photo-1590571054052-eec7ecae1f05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpb3xlbnwwfHx8YmxhY2t8MTc1NDA3MTYxMXww&ixlib=rb-4.1.0&q=85',
    tracks: mockTracks.slice(0, 3)
  },
  {
    id: 2,
    title: 'Klasikler',
    artist: 'Barış Manço',
    year: 1999,
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMHN0dWRpb3xlbnwwfHx8YmxhY2t8MTc1NDA3MTYxMXww&ixlib=rb-4.1.0&q=85',
    tracks: mockTracks.slice(1, 4)
  }
];

// Sidebar Component
export const Sidebar = ({ playlists }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-400">YekMusic</h1>
        <p className="text-xs text-green-300 mt-1">Tamamen Ücretsiz</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-4 mb-8">
        <Link 
          to="/" 
          className={`flex items-center space-x-3 text-sm font-medium transition-colors hover:text-white ${
            isActive('/') ? 'text-white' : 'text-gray-400'
          }`}
        >
          <HomeIcon />
          <span>Ana Sayfa</span>
        </Link>
        <Link 
          to="/arama" 
          className={`flex items-center space-x-3 text-sm font-medium transition-colors hover:text-white ${
            isActive('/arama') ? 'text-white' : 'text-gray-400'
          }`}
        >
          <SearchIcon />
          <span>Arama</span>
        </Link>
        <Link 
          to="/kutuphane" 
          className={`flex items-center space-x-3 text-sm font-medium transition-colors hover:text-white ${
            isActive('/kutuphane') ? 'text-white' : 'text-gray-400'
          }`}
        >
          <LibraryIcon />
          <span>Kütüphanem</span>
        </Link>
      </nav>

      {/* Playlists */}
      <div className="flex-1">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Çalma Listeleri
        </h3>
        <div className="space-y-2">
          {playlists.map(playlist => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className="block text-sm text-gray-400 hover:text-white transition-colors truncate"
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// TopBar Component
export const TopBar = ({ onAddSong }) => {
  return (
    <div className="h-16 bg-black bg-opacity-60 backdrop-blur-md px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-black bg-opacity-50 text-gray-400 hover:text-white">
          <ChevronLeftIcon />
        </button>
        <button className="p-2 rounded-full bg-black bg-opacity-50 text-gray-400 hover:text-white">
          <ChevronRightIcon />
        </button>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={onAddSong}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 hover:scale-105 transition-all flex items-center space-x-2"
        >
          <PlusIcon />
          <span>Şarkı Ekle</span>
        </button>
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <UserIcon />
        </div>
      </div>
    </div>
  );
};

// AddSongModal Component
export const AddSongModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    image: '',
    url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.artist) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Yeni Şarkı Ekle</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Şarkı Adı *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Şarkı adını girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sanatçı *
            </label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Sanatçı adını girin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Albüm
            </label>
            <input
              type="text"
              name="album"
              value={formData.album}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Albüm adını girin"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Süre
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="3:45"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Kapak Resmi URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Müzik URL
            </label>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com/song.mp3"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// HomePage Component
export const HomePage = ({ onPlayTrack, userSongs }) => {
  const recentlyPlayed = mockTracks.slice(0, 4);
  const madeForYou = mockAlbums;
  const allTracks = [...mockTracks, ...userSongs];

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative h-80 rounded-lg overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1599669454699-248893623440?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmVzfGVufDB8fHxibGFja3wxNzU0MDY4ODg5fDA&ixlib=rb-4.1.0&q=85"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">YekMusic'e Hoş Geldiniz</h1>
            <p className="text-xl text-gray-300">Milyonlarca şarkı ve podcast keşfedin</p>
            <p className="text-lg text-green-400 mt-2 font-semibold">%100 Ücretsiz</p>
          </div>
        </div>
      </div>

      {/* User Added Songs */}
      {userSongs.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Eklediğiniz Şarkılar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {userSongs.map(track => (
              <div 
                key={track.id}
                className="bg-green-800 bg-opacity-30 rounded-lg p-4 hover:bg-opacity-50 transition-all cursor-pointer group border border-green-500 border-opacity-30"
                onClick={() => onPlayTrack(track, userSongs, userSongs.findIndex(t => t.id === track.id))}
              >
                <div className="relative mb-4">
                  <img 
                    src={track.image} 
                    alt={track.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                    <PlayIcon />
                  </button>
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Yeni
                  </div>
                </div>
                <h3 className="font-semibold truncate">{track.title}</h3>
                <p className="text-sm text-gray-400 truncate">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Son çalınanlar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyPlayed.map(track => (
            <div 
              key={track.id}
              className="bg-gray-800 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all cursor-pointer group"
              onClick={() => onPlayTrack(track, allTracks, allTracks.findIndex(t => t.id === track.id))}
            >
              <div className="relative mb-4">
                <img 
                  src={track.image} 
                  alt={track.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                  <PlayIcon />
                </button>
              </div>
              <h3 className="font-semibold truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Made for you */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Sizin için özel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {madeForYou.map(album => (
            <Link
              key={album.id}
              to={`/album/${album.id}`}
              className="bg-gray-800 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all cursor-pointer group"
            >
              <div className="relative mb-4">
                <img 
                  src={album.image} 
                  alt={album.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                  <PlayIcon />
                </button>
              </div>
              <h3 className="font-semibold truncate">{album.title}</h3>
              <p className="text-sm text-gray-400 truncate">{album.artist}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

// SearchPage Component
export const SearchPage = ({ onPlayTrack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tracks: [], artists: [], albums: [] });

  useEffect(() => {
    if (searchQuery.trim()) {
      // Mock search functionality
      const filteredTracks = mockTracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredArtists = mockArtists.filter(artist =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredAlbums = mockAlbums.filter(album =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults({
        tracks: filteredTracks,
        artists: filteredArtists,
        albums: filteredAlbums
      });
    } else {
      setSearchResults({ tracks: [], artists: [], albums: [] });
    }
  }, [searchQuery]);

  const genres = [
    { name: 'Pop', color: 'bg-red-500', image: 'https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg' },
    { name: 'Rock', color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMHN0dWRpb3xlbnwwfHx8YmxhY2t8MTc1NDA3MTYxMXww&ixlib=rb-4.1.0&q=85' },
    { name: 'Türk Halk Müziği', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1590571054052-eec7ecae1f05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHN0dWRpb3xlbnwwfHx8YmxhY2t8MTc1NDA3MTYxMXww&ixlib=rb-4.1.0&q=85' },
    { name: 'Arabesk', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1531651008558-ed1740375b39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwzfHxtdXNpYyUyMHN0dWRpb3xlbnwwfHx8YmxhY2t8MTc1NDA3MTYxMXww&ixlib=rb-4.1.0&q=85' },
    { name: 'Elektronik', color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1610716632318-acfc6a85d1ed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxtdXNpYyUyMHN0dWRpb3xlbnwwfHx8YmxhY2t8MTc1NDA3MTYxMXww&ixlib=rb-4.1.0&q=85' },
    { name: 'Klasik', color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxjb25jZXJ0fGVufDF8fHxibGFja3wxNzU0MDcxNjA1fDA&ixlib=rb-4.1.0&q=85' }
  ];

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Ne dinlemek istiyorsunuz?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {!searchQuery ? (
        /* Browse Categories */
        <div>
          <h2 className="text-2xl font-bold mb-6">Hepsine göz atın</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {genres.map(genre => (
              <div
                key={genre.name}
                className={`${genre.color} relative h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
              >
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg">{genre.name}</h3>
                </div>
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="absolute bottom-0 right-0 w-16 h-16 object-cover rounded-tl-lg transform rotate-12 translate-x-2 translate-y-2"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Search Results */
        <div className="space-y-8">
          {/* Top Result */}
          {searchResults.tracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">En iyi sonuç</h2>
              <div 
                className="bg-gray-800 bg-opacity-50 rounded-lg p-6 hover:bg-opacity-70 transition-all cursor-pointer max-w-md"
                onClick={() => onPlayTrack(searchResults.tracks[0], searchResults.tracks, 0)}
              >
                <img 
                  src={searchResults.tracks[0].image} 
                  alt={searchResults.tracks[0].title}
                  className="w-24 h-24 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">{searchResults.tracks[0].title}</h3>
                <p className="text-gray-400">{searchResults.tracks[0].artist}</p>
              </div>
            </section>
          )}

          {/* Songs */}
          {searchResults.tracks.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Şarkılar</h2>
              <div className="space-y-2">
                {searchResults.tracks.slice(0, 5).map((track, index) => (
                  <div 
                    key={track.id}
                    className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 cursor-pointer group"
                    onClick={() => onPlayTrack(track, searchResults.tracks, index)}
                  >
                    <img 
                      src={track.image} 
                      alt={track.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                    <p className="text-sm text-gray-400">{track.duration}</p>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

// LibraryPage Component
export const LibraryPage = ({ playlists }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Kütüphanem</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playlists.map(playlist => (
          <Link
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            className="bg-gray-800 bg-opacity-50 rounded-lg p-4 hover:bg-opacity-70 transition-all cursor-pointer group"
          >
            <div className="relative mb-4">
              <img 
                src={playlist.image} 
                alt={playlist.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:scale-105 transition-all">
                <PlayIcon />
              </button>
            </div>
            <h3 className="font-semibold mb-2">{playlist.name}</h3>
            <p className="text-sm text-gray-400">{playlist.tracks} şarkı</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

// PlaylistPage Component
export const PlaylistPage = ({ onPlayTrack, userSongs }) => {
  const { id } = useParams();
  const playlist = {
    id: parseInt(id),
    name: 'Çalma Listem #1',
    description: 'En sevdiğiniz şarkılar bir arada',
    image: 'https://images.unsplash.com/photo-1505672984986-b7c468c7a134?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDF8fHxibGFja3wxNzU0MDY0NTM2fDA&ixlib=rb-4.1.0&q=85',
    tracks: [...mockTracks, ...userSongs],
    totalDuration: '25 dk 18 sn'
  };

  return (
    <div>
      {/* Playlist Header */}
      <div className="p-6 bg-gradient-to-b from-gray-700 to-gray-900">
        <div className="flex items-end space-x-6">
          <img 
            src={playlist.image} 
            alt={playlist.name}
            className="w-60 h-60 object-cover rounded-lg shadow-2xl"
          />
          <div>
            <p className="text-sm font-medium text-gray-300 mb-2">ÇALMA LİSTESİ</p>
            <h1 className="text-7xl font-black mb-6">{playlist.name}</h1>
            <p className="text-gray-300 mb-4">{playlist.description}</p>
            <p className="text-sm text-gray-400">
              {playlist.tracks.length} şarkı, {playlist.totalDuration}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="flex items-center space-x-6 mb-8">
          <button 
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            onClick={() => onPlayTrack(playlist.tracks[0], playlist.tracks, 0)}
          >
            <PlayIcon className="w-6 h-6 ml-1" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <HeartIcon className="w-8 h-8" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <MoreIcon className="w-8 h-8" />
          </button>
        </div>

        {/* Track List */}
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
            <div className="col-span-1">#</div>
            <div className="col-span-6">BAŞLIK</div>
            <div className="col-span-3">ALBÜM</div>
            <div className="col-span-2 text-right">SÜRE</div>
          </div>
          
          {playlist.tracks.map((track, index) => (
            <div 
              key={track.id}
              className={`grid grid-cols-12 gap-4 px-4 py-2 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 cursor-pointer group ${
                track.isUserAdded ? 'bg-green-900 bg-opacity-20' : ''
              }`}
              onClick={() => onPlayTrack(track, playlist.tracks, index)}
            >
              <div className="col-span-1 flex items-center">
                <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                <PlayIcon className="w-4 h-4 hidden group-hover:block" />
              </div>
              <div className="col-span-6 flex items-center space-x-3">
                <img 
                  src={track.image} 
                  alt={track.title}
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{track.title}</p>
                    {track.isUserAdded && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Yeni
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
              </div>
              <div className="col-span-3 flex items-center text-gray-400">
                {track.album}
              </div>
              <div className="col-span-2 flex items-center justify-end text-gray-400">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// AlbumPage Component
export const AlbumPage = ({ onPlayTrack }) => {
  const { id } = useParams();
  const album = mockAlbums.find(a => a.id === parseInt(id)) || mockAlbums[0];

  return (
    <div>
      {/* Album Header */}
      <div className="p-6 bg-gradient-to-b from-purple-700 to-gray-900">
        <div className="flex items-end space-x-6">
          <img 
            src={album.image} 
            alt={album.title}
            className="w-60 h-60 object-cover rounded-lg shadow-2xl"
          />
          <div>
            <p className="text-sm font-medium text-gray-300 mb-2">ALBÜM</p>
            <h1 className="text-7xl font-black mb-6">{album.title}</h1>
            <p className="text-xl text-gray-300 mb-4">{album.artist}</p>
            <p className="text-sm text-gray-400">
              {album.year} • {album.tracks.length} şarkı
            </p>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="flex items-center space-x-6 mb-8">
          <button 
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            onClick={() => onPlayTrack(album.tracks[0], album.tracks, 0)}
          >
            <PlayIcon className="w-6 h-6 ml-1" />
          </button>
        </div>

        <div className="space-y-2">
          {album.tracks.map((track, index) => (
            <div 
              key={track.id}
              className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 cursor-pointer group"
              onClick={() => onPlayTrack(track, album.tracks, index)}
            >
              <div className="w-8 text-center">
                <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                <PlayIcon className="w-4 h-4 hidden group-hover:block mx-auto" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{track.title}</p>
                <p className="text-sm text-gray-400">{track.artist}</p>
              </div>
              <p className="text-sm text-gray-400">{track.duration}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ArtistPage Component
export const ArtistPage = ({ onPlayTrack }) => {
  const { id } = useParams();
  const artist = mockArtists.find(a => a.id === parseInt(id)) || mockArtists[0];
  const artistTracks = mockTracks.filter(track => track.artist === artist.name);

  return (
    <div>
      {/* Artist Header */}
      <div className="p-6 bg-gradient-to-b from-blue-700 to-gray-900">
        <div className="flex items-end space-x-6">
          <img 
            src={artist.image} 
            alt={artist.name}
            className="w-60 h-60 object-cover rounded-full shadow-2xl"
          />
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {artist.verified && <VerifiedIcon className="w-6 h-6 text-blue-500" />}
              <p className="text-sm font-medium text-gray-300">Doğrulanmış Sanatçı</p>
            </div>
            <h1 className="text-7xl font-black mb-6">{artist.name}</h1>
            <p className="text-sm text-gray-400">
              {artist.followers} aylık dinleyici
            </p>
          </div>
        </div>
      </div>

      {/* Popular Tracks */}
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="flex items-center space-x-6 mb-8">
          <button 
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            onClick={() => onPlayTrack(artistTracks[0], artistTracks, 0)}
          >
            <PlayIcon className="w-6 h-6 ml-1" />
          </button>
          <button className="px-6 py-2 border border-gray-600 rounded-full text-sm font-medium hover:border-white transition-colors">
            Takip Ediliyor
          </button>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Popüler</h2>
          <div className="space-y-2">
            {artistTracks.slice(0, 5).map((track, index) => (
              <div 
                key={track.id}
                className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 cursor-pointer group"
                onClick={() => onPlayTrack(track, artistTracks, index)}
              >
                <div className="w-8 text-center">
                  <span className="text-gray-400 group-hover:hidden">{index + 1}</span>
                  <PlayIcon className="w-4 h-4 hidden group-hover:block mx-auto" />
                </div>
                <img 
                  src={track.image} 
                  alt={track.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{track.title}</p>
                </div>
                <p className="text-sm text-gray-400">{track.duration}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// MusicPlayer Component
export const MusicPlayer = ({ 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrevious, 
  volume, 
  onVolumeChange,
  audioRef 
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!currentTrack) return null;

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-700 px-4 flex items-center justify-between">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        volume={volume}
      />
      
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-80">
        <img 
          src={currentTrack.image} 
          alt={currentTrack.title}
          className="w-14 h-14 object-cover rounded"
        />
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{currentTrack.title}</p>
          <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
        </div>
        <button className="text-gray-400 hover:text-white">
          <HeartIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex-1 max-w-2xl">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <button className="text-gray-400 hover:text-white">
            <ShuffleIcon className="w-5 h-5" />
          </button>
          <button 
            onClick={onPrevious}
            className="text-gray-400 hover:text-white"
          >
            <PreviousIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={onTogglePlay}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-1" />}
          </button>
          <button 
            onClick={onNext}
            className="text-gray-400 hover:text-white"
          >
            <NextIcon className="w-6 h-6" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <RepeatIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-white rounded-full relative group-hover:bg-green-500"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
            </div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="flex items-center space-x-3 w-80 justify-end">
        <button className="text-gray-400 hover:text-white">
          <VolumeIcon className="w-5 h-5" />
        </button>
        <div className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer group">
          <div 
            className="h-full bg-white rounded-full relative group-hover:bg-green-500"
            style={{ width: `${volume * 100}%` }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              onVolumeChange(Math.max(0, Math.min(1, percent)));
            }}
          >
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon Components
const HomeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const SearchIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const LibraryIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
    <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zM5.5 9.643a.75.75 0 00-1.5 0V16a1 1 0 001 1h1a1 1 0 001-1v-6.357z" />
    <path d="M17.5 9.643a.75.75 0 00-1.5 0V16a1 1 0 001 1h1a1 1 0 001-1v-6.357z" />
  </svg>
);

const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const HeartIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const MoreIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
  </svg>
);

const PreviousIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
  </svg>
);

const NextIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
  </svg>
);

const ShuffleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="16,3 21,3 21,8"></polyline>
    <line x1="4" y1="20" x2="21" y2="3"></line>
    <polyline points="21,16 21,21 16,21"></polyline>
    <line x1="15" y1="15" x2="21" y2="21"></line>
    <line x1="4" y1="4" x2="9" y2="9"></line>
  </svg>
);

const RepeatIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="17,1 21,5 17,9"></polyline>
    <path d="m21 5H9a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h4"></path>
    <polyline points="7,23 3,19 7,15"></polyline>
    <path d="m3 19h12a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4h-4"></path>
  </svg>
);

const VolumeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19 11,5"></polygon>
    <path d="m19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const VerifiedIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);