import React,{useState} from 'react'
import CreatePlaylist from '../../components/createPlaylist';
import PlaylistGrid from '../../components/PlaylistGrid';


export default function DashboardPage() {

const [modal,setShowModal]=useState<boolean>(false)

  const openModal=()=> setShowModal(true);
  const closeModal=()=> setShowModal(false);

  return (
    <div >
       <header></header>
       <div className='mt-[40px] flex flex-row gap-[760px] ml-6 mr-6'>
         <h1 className='text-[48px] font-semibold'>Your playlists</h1>
         <button className='border-none bg-amber-500 w-[100px] h-[50px] text-[14px] rounded-[10px] mt-3 ' onClick={openModal}>Create New Playlist</button>
       </div>
       
       <div>
         <PlaylistGrid/>
       </div>

        {modal && (
          <div><CreatePlaylist/></div>
        )}
    </div>
  )
}


// import React, { useState, useEffect } from 'react';
// import CreatePlaylist from '../../components/createPlaylist';
// import PlaylistGrid from '../../components/PlaylistGrid';
// import { useAuth } from '../../components/dataprovider/AuthContext';
// import { db } from '../../../utility/firebase'; // Assuming you have a Firestore instance exported
// import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// interface Playlist {
//   id: string;
//   name: string;
//   imageUrl: string;
//   userId: string;
// }

// export default function DashboardPage() {
//   const { user } = useAuth(); // Get the logged-in user
//   const [modal, setShowModal] = useState<boolean>(false);
//   const [playlists, setPlaylists] = useState<Playlist[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const openModal = () => setShowModal(true);
//   const closeModal = () => setShowModal(false);

//   // Function to save the playlist to Firebase
//   const handleSavePlaylist = async (playlistName: string) => {
//     if (!user) return;

//     try {
//       // Add the new playlist to a "playlists" collection in Firestore
//       const docRef = await addDoc(collection(db, "playlists"), {
//         name: playlistName,
//         userId: user.uid,
//         imageUrl: "https://via.placeholder.com/150", // Placeholder image
//         createdAt: new Date(),
//       });
      
//       // Update the local state with the new playlist
//       setPlaylists(prevPlaylists => [
//         ...prevPlaylists, 
//         { 
//           id: docRef.id, 
//           name: playlistName, 
//           imageUrl: "https://via.placeholder.com/150",
//           userId: user.uid,
//         }
//       ]);
//       console.log("Document written with ID: ", docRef.id);
//       closeModal(); // Close the modal after saving
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };

//   // Fetch the user's playlists from Firebase on component mount
//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       if (user) {
//         setLoading(true);
//         const q = query(collection(db, "playlists"), where("userId", "==", user.uid));
//         const querySnapshot = await getDocs(q);
        
//         const fetchedPlaylists: Playlist[] = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           fetchedPlaylists.push({
//             id: doc.id,
//             name: data.name,
//             imageUrl: data.imageUrl,
//             userId: data.userId,
//           });
//         });
        
//         setPlaylists(fetchedPlaylists);
//         setLoading(false);
//       } else {
//         setPlaylists([]);
//         setLoading(false);
//       }
//     };
//     fetchPlaylists();
//   }, [user]); // Re-run when the user object changes

//   return (
//     <div>
//       <header></header>
//       <div className='mt-[40px] flex flex-row justify-between items-center ml-6 mr-6'>
//         <h1 className='text-[48px] font-semibold'>Your playlists</h1>
//         <button 
//           className='border-none bg-amber-500 w-[150px] h-[50px] text-[14px] rounded-[10px] text-white font-bold ' 
//           onClick={openModal}
//         >
//           Create New Playlist
//         </button>
//       </div>
      
//       {/* Pass the state to the PlaylistGrid component */}
//       {loading ? (
//         <div>Loading playlists...</div>
//       ) : (
//         <PlaylistGrid playlists={playlists} />
//       )}

//       {modal && (
//         <CreatePlaylist onClose={closeModal} onSave={handleSavePlaylist} />
//       )}
//     </div>
//   );
// }