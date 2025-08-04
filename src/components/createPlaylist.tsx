import React from 'react'

export default function createPlaylist() {
  return (
    <div>
       <div className='max-w-[700px] max-h-[300px] bg-amber-100 rounded-[15px] p-3'>
          <label htmlFor="playlist name">playlist name</label>
          <input type="text"  size={40} className='border-none'/>
          <div>
            <button>save</button>
            <button>cancel</button>
          </div>
       </div>
    </div>
  )
}


// import React, { useState } from 'react';
// import CloseIcon from '@mui/icons-material/Close';

// interface CreatePlaylistProps {
//   onClose: () => void;
//   onSave: (playlistName: string) => void;
// }

// export default function CreatePlaylist({ onClose, onSave }: CreatePlaylistProps) {
//   const [playlistName, setPlaylistName] = useState<string>('');

//   const handleSave = () => {
//     if (playlistName.trim() !== '') {
//       onSave(playlistName); // Pass the playlist name to the parent component
//       setPlaylistName(''); // Clear the input
//     }
//   };

//   return (
//     <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
//       <div className='max-w-[700px] bg-amber-100 rounded-[15px] p-6 text-center'>
//         <div className='flex justify-end'>
//           <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><CloseIcon /></button>
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="playlistName" className="block text-gray-700 text-lg font-semibold mb-2">Playlist Name</label>
//           <input 
//             id="playlistName"
//             type="text"
//             size={40}
//             className='border-none rounded-[10px] p-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
//             value={playlistName}
//             onChange={(e) => setPlaylistName(e.target.value)}
//           />
//         </div>
        
//         <div className="flex justify-center gap-4">
//           <button 
//             onClick={handleSave} 
//             className='bg-amber-500 text-white font-bold py-2 px-4 rounded-[10px] hover:bg-amber-600 transition-colors'
//           >
//             Save
//           </button>
//           <button 
//             onClick={onClose} 
//             className='bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-[10px] hover:bg-gray-400 transition-colors'
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }