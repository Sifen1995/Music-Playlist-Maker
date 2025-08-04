import React from 'react';
import { db } from '../../utility/firebase'; // Adjust this path if needed
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

interface Playlist {
  id: string;
  name: string;
}

interface Track {
  id: number;
  name: string;
  track: number;
  audio: string;
  genre: string;
}

interface AddToPlaylistModalProps {
  playlists: Playlist[];
  trackToAdd: Track;
  onClose: () => void;
}

export default function AddToPlaylistModal({ playlists, trackToAdd, onClose }: AddToPlaylistModalProps) {
  const handleAddToPlaylist = async (playlistId: string) => {
    try {
      const playlistRef = doc(db, 'playlists', playlistId);
      
      // Use arrayUnion to add the track to the 'songs' array
      // This is an atomic operation that prevents overwriting existing data.
      await updateDoc(playlistRef, {
        songs: arrayUnion({
          id: trackToAdd.id,
          name: trackToAdd.name,
          audio: trackToAdd.audio,
          genre: trackToAdd.genre,
        })
      });
      console.log(`Song "${trackToAdd.name}" added to playlist ID: ${playlistId}`);
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      alert("Failed to add song to playlist. Check the console for details.");
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='bg-white p-6 rounded-lg w-[300px]'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold'>Add to Playlist</h2>
          <button onClick={onClose} className='text-gray-500 hover:text-gray-700'>
            &times;
          </button>
        </div>
        {playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id} className='p-2 hover:bg-gray-100 rounded cursor-pointer' onClick={() => handleAddToPlaylist(playlist.id)}>
                {playlist.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>You don't have any playlists. Go to your dashboard to create one!</p>
        )}
      </div>
    </div>
  );
}