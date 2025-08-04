import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the playlistId from the URL
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../utility/firebase'; // Adjust this path if needed

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
    return <div>Loading playlist...</div>;
  }

  if (!playlist) {
    return <div>Playlist not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
      <p className="text-gray-500 mb-6">{playlist.description}</p>

      {playlist.songs.length > 0 ? (
        <ul className="space-y-4">
          {playlist.songs.map((song) => (
            <li key={song.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{song.name}</h2>
              <p className="text-sm text-gray-600">Genre: {song.genre}</p>
              <audio controls src={song.audio} className="mt-2 w-full"></audio>
            </li>
          ))}
        </ul>
      ) : (
        <p>This playlist has no songs yet.</p>
      )}
    </div>
  );
}