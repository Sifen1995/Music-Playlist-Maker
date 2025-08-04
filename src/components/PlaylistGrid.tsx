import React, { useState, useEffect } from 'react';
import PlaylistCard from './PlaylistCard';
import type { PlaylistsType } from '../pages/dashboard/DashboardPage';
// You will need to import your useAuth hook and Spotify API functions here
// import { useAuth } from '../../contexts/AuthContext';
// import { getMyPlaylists } from '../../api/spotify';

// const mockPlaylists = [
//   {
//     id: '1',
//     name: 'Morning Raga',
//     description: 'A collection of serene and uplifting songs to start your day with a clear mind and positive energy.',
//     imageUrl: 'https://i.scdn.co/image/ab67616d0000b2734125b341f237f375f320b925',
//   },
//   {
//     id: '2',
//     name: 'Workout Hits',
//     description: 'High-energy tracks and powerful beats to keep you motivated and push through your gym sessions.',
//     imageUrl: 'https://i.scdn.co/image/ab67616d0000b27376a5e1823101e4a2c1f4e3c3',
//   },
//   {
//     id: '3',
//     name: 'Chill Vibes',
//     description: 'Relaxing tunes and mellow melodies for unwinding after a long day or simply chilling out with friends.',
//     imageUrl: 'https://i.scdn.co/image/ab67616d0000b273a5a1f6a1a1f4a4c1e6f1f3e3',
//   },
//   {
//     id: '4',
//     name: 'Late Night Study',
//     description: 'Instrumental and lo-fi beats to help you focus and concentrate during your study sessions or creative work.',
//     imageUrl: 'https://i.scdn.co/image/ab67616d0000b27318f7000d11e5c46d3e38c3e3',
//   },
// ];

const PlaylistGrid= ({playlists}: {playlists: PlaylistsType[]}) => {
  // const [playlists, setPlaylists] = useState(mockPlaylists);
  const [loading, setLoading] = useState(true);
  // const { user } = useAuth();

  useEffect(() => {
    // This is where you'd fetch your data from the Spotify API
    const fetchPlaylists = async () => {
      // if (user) {
      //   try {
      //     const data = await getMyPlaylists(user.accessToken); // You need to implement this function
      //     setPlaylists(data);
      //   } catch (error) {
      //     console.error("Failed to fetch playlists:", error);
      //     setPlaylists([]); // Set to empty on error
      //   } finally {
      //     setLoading(false);
      //   }
      // } else {
      //   setLoading(false);
      // }
      
      // Since we are using mock data, we just set loading to false after a timeout
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timeout);
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <div>Loading playlists...</div>;
  }

  if (playlists.length === 0) {
    return <div>You don't have any playlists yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          id={playlist.id}
          name={playlist.name}
          description={playlist.description}
          imageUrl={playlist.imageUrl}
        />
      ))}
    </div>
  );
};

export default PlaylistGrid;