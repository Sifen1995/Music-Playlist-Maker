import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../utility/firebase'
import { signOut } from 'firebase/auth'
import PlaylistGrid from '../../components/PlaylistGrid'
import CreatePlaylist from '../../components/createPlaylist'
import Navigation from '../../components/Navigation'
import { useAuth } from '../../components/dataprovider/AuthContext'
import { db } from '../../../utility/firebase'
import { collection, addDoc, query, where, getDocs, onSnapshot } from 'firebase/firestore'

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
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<PlaylistsType[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch playlists from Firestore
  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      query(collection(db, 'playlists'), where('userId', '==', user.uid)),
      (snapshot) => {
        const fetchedPlaylists: PlaylistsType[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedPlaylists.push({
            id: doc.id,
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl || 'https://i.scdn.co/image/ab67616d0000b27318f7000d11e5c46d3e38c3e3'
          });
        });
        setPlaylists(fetchedPlaylists);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching playlists:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleSavePlaylist = async (name: string, description: string) => {
    if (!user) return;

    try {
      const newPlaylist = {
        name,
        description,
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b27318f7000d11e5c46d3e38c3e3',
        userId: user.uid,
        songs: []
      };

      await addDoc(collection(db, 'playlists'), newPlaylist);
      closeModal();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div>
      <Navigation />
      <div className='mt-[80px] flex flex-row gap-[760px] ml-6 mr-6'>
        <h1 className='text-[48px] font-semibold'>Your playlists</h1>
        <button className='border-none bg-amber-500 w-[100px] h-[50px] text-[14px] rounded-[10px] mt-3 ' onClick={openModal}>Create New Playlist</button>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <PlaylistGrid playlists={playlists} />
        )}
      </div>

      {Modal && (
        <div><CreatePlaylist onSave={handleSavePlaylist} closeModal={closeModal}/></div>
      )}
    </div>
  )
}


