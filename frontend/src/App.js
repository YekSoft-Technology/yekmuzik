import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  Sidebar, 
  TopBar, 
  HomePage, 
  SearchPage, 
  LibraryPage, 
  PlaylistPage, 
  MusicPlayer,
  AlbumPage,
  ArtistPage
} from './components';

function App() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  // Mock data for demonstration
  const mockPlaylists = [
    { id: 1, name: 'Liked Songs', tracks: 143, image: 'https://images.unsplash.com/photo-1505672984986-b7c468c7a134?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibGFja3wxNzU0MDY0NTM2fDA&ixlib=rb-4.1.0&q=85' },
    { id: 2, name: 'My Playlist #1', tracks: 23, image: 'https://images.unsplash.com/photo-1580112646171-13522164ead4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxtdXNpYyUyMGFsYnVtfGVufDB8fHxibGFja3wxNzU0MDY0NTM2fDA&ixlib=rb-4.1.0&q=85' },
    { id: 3, name: 'Chill Vibes', tracks: 67, image: 'https://images.pexels.com/photos/7098114/pexels-photo-7098114.jpeg' },
    { id: 4, name: 'Workout Mix', tracks: 45, image: 'https://images.pexels.com/photos/7605539/pexels-photo-7605539.jpeg' }
  ];

  const playTrack = (track, trackQueue = [], index = 0) => {
    setCurrentTrack(track);
    setQueue(trackQueue);
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const skipToNext = () => {
    if (currentTrackIndex < queue.length - 1) {
      const nextIndex = currentTrackIndex + 1;
      setCurrentTrackIndex(nextIndex);
      setCurrentTrack(queue[nextIndex]);
    }
  };

  const skipToPrevious = () => {
    if (currentTrackIndex > 0) {
      const prevIndex = currentTrackIndex - 1;
      setCurrentTrackIndex(prevIndex);
      setCurrentTrack(queue[prevIndex]);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex h-screen bg-black text-white">
          <Sidebar playlists={mockPlaylists} />
          
          <div className="flex-1 flex flex-col">
            <TopBar />
            <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
              <Routes>
                <Route path="/" element={<HomePage onPlayTrack={playTrack} />} />
                <Route path="/search" element={<SearchPage onPlayTrack={playTrack} />} />
                <Route path="/library" element={<LibraryPage playlists={mockPlaylists} />} />
                <Route path="/playlist/:id" element={<PlaylistPage onPlayTrack={playTrack} />} />
                <Route path="/album/:id" element={<AlbumPage onPlayTrack={playTrack} />} />
                <Route path="/artist/:id" element={<ArtistPage onPlayTrack={playTrack} />} />
              </Routes>
            </main>
          </div>
        </div>
        
        {currentTrack && (
          <MusicPlayer 
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onNext={skipToNext}
            onPrevious={skipToPrevious}
            volume={volume}
            onVolumeChange={setVolume}
            currentTime={currentTime}
            duration={duration}
            audioRef={audioRef}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;