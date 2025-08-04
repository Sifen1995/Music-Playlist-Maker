import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../utility/firebase'
import { signOut } from 'firebase/auth'
import PlaylistGrid from '../../components/PlaylistGrid'
import CreatePlaylist from '../../components/createPlaylist'

export default function DashboardPage() {
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
         <PlaylistGrid/>
       </div>

        {Modal && (
          <div><CreatePlaylist/></div>
        )}
    </div>
  )
}


