import React from 'react';
import Style from './landing.module.css'; 
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate=useNavigate()

    const playlist=()=>{
      console.log("Button clicked, navigating to dashboard...");
       navigate('/dashboard')
    }

    console.log("hljhl")
  return (
    <div>
      {/* The outer div wrapping the banner is not strictly necessary unless you have other content */}
      <div>
        <div className={Style.banner}>
         <p>Craft Your Sound. Your Way.</p>
         <button className='mt-[30px] text-white bg-amber-800 border-none rounded-[10px] w-[150px] p-2  font-bold relative z-10' onClick={playlist}>Go to my playlist</button>
         

        </div>

        <h2 className='text-[40px] text-amber-900 ml-3 font-bold'>New Albums</h2>
        <div className='w-full mx-[20px]'>
          new album section
        </div>
        <button onClick={() => console.log('clicked')}>Click me</button>
      </div>

     
    </div>
  );
}