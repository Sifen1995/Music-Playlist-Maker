import React from 'react'

export default function DashboardPage() {
  return (
    <div >
       <header></header>
       <div className='mt-[40px] flex flex-row gap-[760px] ml-6 mr-6'>
         <h1 className='text-[48px] font-semibold'>Your playlists</h1>
         <button className='border-none bg-amber-500 w-[100px] h-[50px] text-[14px] rounded-[10px] mt-3'>Create New Playlist</button>
       </div>

       <div>
         cards
       </div>
    </div>
  )
}
