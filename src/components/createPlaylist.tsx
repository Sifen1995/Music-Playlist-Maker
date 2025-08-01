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
