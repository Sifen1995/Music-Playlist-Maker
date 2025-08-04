import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PlaylistCard from './PlaylistCard';
import type { PlaylistsType } from '../pages/dashboard/DashboardPage';

// interface Playlist {
//   id: string;
//   name: string;
//   imageUrl: string;
//   userId: string;
// }

interface PlaylistGridProps {
  playlists: PlaylistsType[];
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePlaylistClick = (playlistId: string) => {
    // Navigate to a new route with the playlist's ID in the URL
    navigate(`/playlist/${playlistId}`);
  };

  if (playlists.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        You don't have any playlists yet. Click "Create New Playlist" to get started!
      </div>
    );
  }

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {playlists.map((playlist) => (
        // Add an onClick handler to the card or its container
        <div key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)} className="cursor-pointer">
          <PlaylistCard
            id={playlist.id}
            name={playlist.name}
            imageUrl={playlist.imageUrl}
            description={""} // Assuming description is not in your playlist object
          />
        </div>
      ))}
    </div>
  );
};

export default PlaylistGrid;