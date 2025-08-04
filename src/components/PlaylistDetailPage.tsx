import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // To get the playlistId from the URL
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utility/firebase'; // Adjust this path if needed
import Navigation from './Navigation';

// Define interfaces for the data structure
interface Song {
  id: number;
  name: string;
  audio: string;
  genre: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  songs: Song[]; // Assuming songs are stored as an array
}

export default function PlaylistDetailPage() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (!playlistId) return;

      try {
        const docRef = doc(db, 'playlists', playlistId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPlaylist({
            id: docSnap.id,
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            songs: data.songs || [], // Handle case where 'songs' array doesn't exist
          } as Playlist);
        } else {
          console.log("No such playlist found!");
        }
      } catch (e) {
        console.error("Error fetching playlist:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistDetails();
  }, [playlistId]); // Re-run effect if the playlistId changes

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className='h-screen flex justify-center items-center mt-16'>
          <svg
            className='w-8 h-8 animate-spin'
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <line x1="20.4282" y1="12.2143" x2="18.4998" y2="12.2143" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="5.50021" y1="12.2143" x2="3.5718" y2="12.2143" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="12.2143" y1="3.57178" x2="12.2143" y2="5.50019" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="12.2143" y1="18.4998" x2="12.2143" y2="20.4282" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="6.19197" y1="5.88867" x2="7.55556" y2="7.25227" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="16.7476" y1="16.4444" x2="18.1112" y2="17.808" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="5.88884" y1="17.8077" x2="7.25243" y2="16.4441" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="16.4445" y1="7.25223" x2="17.8081" y2="5.88864" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> </g>
          </svg>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div>
        <Navigation />
        <div className="mt-16 p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Playlist Not Found</h1>
            <p className="text-gray-600 mb-6">The playlist you're looking for doesn't exist or has been deleted.</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="mt-16 p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{playlist.name}</h1>
        <p className="text-gray-500 mb-6">{playlist.description}</p>

        {playlist.songs.length > 0 ? (
          <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {playlist.songs.map((song) => (
              <li key={song.id} className="p-4 h-[150px] bg-gray-100 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{song.name}</h2>
                <p className="text-sm text-gray-600">Genre: {song.genre}</p>
                <audio controls src={song.audio} className="mt-2 w-[200px] md:w-[300px]"></audio>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">This playlist has no songs yet.</p>
            <p className="text-gray-400 text-sm mt-2">Add songs from the music player on the home page!</p>
          </div>
        )}
      </div>
    </div>
  );
}