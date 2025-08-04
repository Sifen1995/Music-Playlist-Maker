
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
        <h1 className='text-[48px] font-semibold'>Your playlists</h1>
        <button 
          className='border-none bg-amber-500 w-[150px] h-[50px] text-[14px] rounded-[10px] text-white font-bold ' 
          onClick={openModal}
        >
          Create New Playlist
        </button>
      </div>
      
      {loading ? (
        <div>Loading playlists...</div>
      ) : (
        <PlaylistGrid playlists={playlists} />
      )}

      {modal && (
        
        <CreatePlaylist closeModal={closeModal} onSave={handleSavePlaylist} />
      )}
    </div>
  );
}