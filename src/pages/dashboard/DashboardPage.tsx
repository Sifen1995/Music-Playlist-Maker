import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../utility/firebase'
import { signOut } from 'firebase/auth'
import PlaylistGrid from '../../components/PlaylistGrid'
import CreatePlaylist from '../../components/createPlaylist'

export type PlaylistsType = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// const mockPlaylists: PlaylistsType[] = [
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

export default function DashboardPage() {

  const [playlists, setPlaylists] = useState<PlaylistsType[]>([]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const [Modal, setShowModal] = useState<boolean>(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <div className='mt-[40px] flex flex-row gap-[760px] ml-6 mr-6'>
        <h1 className='text-[48px] font-semibold'>Your playlists</h1>
        <button className='border-none bg-amber-500 w-[100px] h-[50px] text-[14px] rounded-[10px] mt-3 ' onClick={openModal}>Create New Playlist</button>
      </div>

      <div>
        <PlaylistGrid playlists={playlists} />
      </div>

      {Modal && (
        <div><CreatePlaylist setPlaylists={setPlaylists} closeModal={closeModal}/></div>
      )}
    </div>
  )
}


