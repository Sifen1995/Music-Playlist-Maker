import React, { useState } from 'react'
import type { PlaylistsType } from '../pages/dashboard/DashboardPage'

export default function CreatePlaylist({setPlaylists, closeModal}: {setPlaylists: React.Dispatch<React.SetStateAction<PlaylistsType[]>>, closeModal: () => void}) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  function handleCreatePlaylist(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPlaylists((prev) => ([
      ...prev, {
        id: Date.now().toString(),
        name,
        description,
        imageUrl: 'https://i.scdn.co/image/ab67616d0000b27318f7000d11e5c46d3e38c3e3'
      }
    ]));
    setName('');
    setDescription('');
    closeModal();
    // if (onCancel) onCancel(); // Close modal if provided
  }

  return (
    
    <div>
      <form onSubmit={handleCreatePlaylist} className='max-w-[700px] max-h-[300px] bg-amber-100 rounded-[15px] p-3 flex flex-col gap-4'>
        <div className='flex gap-2'>
          <label htmlFor="playlist name">playlist name</label>
          <input 
            type="text" 
            size={40} 
            className='border' 
            placeholder='enter name for your playlist'
            value={name}
            onChange={e => setName(e.target.value)} />
        </div>
        <div className='flex gap-2'>
          <label htmlFor="">description</label>
          <input 
            type="text" 
            placeholder='short description' 
            className='border'
            value={description}
            onChange={e => setDescription(e.target.value)}
             />
        </div>
        <div className='flex gap-2 justify-end'>
          <button type='submit' className='bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600'>save</button>
          <button type='button' onClick={closeModal} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>cancel</button>
        </div>
      </form>
    </div>
  )
}


