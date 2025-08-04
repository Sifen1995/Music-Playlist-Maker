
import React, { useState, useEffect } from 'react';
import CreatePlaylist from '../../components/createPlaylist';
import PlaylistGrid from '../../components/PlaylistGrid';
import { useAuth } from '../../components/dataprovider/AuthContext';
import { db } from '../../../utility/firebase'; // Assuming 'db' is your Firestore instance
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';


export interface Playlist {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  userId: string;
}

export default function DashboardPage() {
  const { user } = useAuth(); // Get the logged-in user
  const [modal, setShowModal] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  const handleSavePlaylist = async (name: string, description: string) => {
    if (!user) {
      console.error("User not authenticated.");
      return;
    }

    try {

      const docRef = await addDoc(collection(db, "playlists"), {
        name: name,
        description: description,
        userId: user.uid,
        imageUrl: 'https://via.placeholder.com/150',
        createdAt: new Date(),
      });


      setPlaylists(prevPlaylists => [
        ...prevPlaylists,
        {
          id: docRef.id,
          name: name,
          description: description,
          imageUrl: 'https://via.placeholder.com/150',
          userId: user.uid,
        }
      ]);
      console.log("Playlist successfully saved with ID: ", docRef.id);
      closeModal(); // Close the modal
    } catch (e) {
      console.error("Error adding playlist to Firestore: ", e);
    }
  };


  useEffect(() => {
    const fetchPlaylists = async () => {
      if (user) {
        setLoading(true);
        const q = query(collection(db, "playlists"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedPlaylists: Playlist[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedPlaylists.push({
            id: doc.id,
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
            userId: data.userId,
          });
        });

        setPlaylists(fetchedPlaylists);
        setLoading(false);
      } else {
        setPlaylists([]);
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, [user]);

  return (
    <div>
      <header></header>
      <div className='mt-[40px] flex flex-row justify-between items-center ml-6 mr-6'>
        <h1 className='md:text-[38px] text-lg font-semibold text-gray-700'>Your playlists</h1>
        <button
          className='border-none bg-amber-500 md:w-[150px] md:h-[50px] m:text-[14px] text-sm py-1 px-2 md:rounded-[10px] rounded-[5px] text-white font-bold '
          onClick={openModal}
        >
          Create New Playlist
        </button>
      </div>

      {loading ? (
        <div className='h-screen flex justify-center items-center'>
          <svg
            className='w-8 h-8 animate-spin' 
            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <line x1="20.4282" y1="12.2143" x2="18.4998" y2="12.2143" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="5.50021" y1="12.2143" x2="3.5718" y2="12.2143" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="12.2143" y1="3.57178" x2="12.2143" y2="5.50019" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="12.2143" y1="18.4998" x2="12.2143" y2="20.4282" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="6.19197" y1="5.88867" x2="7.55556" y2="7.25227" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="16.7476" y1="16.4444" x2="18.1112" y2="17.808" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="5.88884" y1="17.8077" x2="7.25243" y2="16.4441" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> <line x1="16.4445" y1="7.25223" x2="17.8081" y2="5.88864" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line> </g>
          </svg>
        </div>
      ) : (
        <PlaylistGrid playlists={playlists} />
      )}

      {modal && (

        <CreatePlaylist closeModal={closeModal} onSave={handleSavePlaylist} />
      )}
    </div>
  );
}