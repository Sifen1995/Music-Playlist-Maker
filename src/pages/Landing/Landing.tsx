import React, { useEffect, useState } from 'react';
import Style from './landing.module.css';
import { useNavigate } from 'react-router-dom';

type Track = {
  id: number;
  name: string;
  track: number;
  audio: string;
  genre: string;
};

export default function Landing() {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    fetch("/src/dummyfile.json")
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
      })
      .catch((err) => console.error("Failed to load tracks", err));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const currentTrack = tracks[currentIndex];

  const playlist = () => {
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

        {/* <h2 className='text-[40px] text-amber-900 ml-3 font-bold'>New Albums</h2>
        <div className='w-full mx-[20px]'>
          new album section
        </div>
        <button onClick={() => console.log('clicked')}>Click me</button> */}
        {/* Music Player */}
          {tracks.length > 0 && (
            <div className='flex w-[200px] items-center '>
              <div>
                {/* <h1 className="text-center">Music Playlist</h1> */}
                <div className="bg-orange-300 py-4 px-8 rounded-4xl mt-5">
                  <h3>Track {currentTrack.track}</h3>
                  <div className="flex gap-2">
                    <button onClick={handlePrev}>Prev</button>
                    <audio controls src={currentTrack.audio} autoPlay />
                    <button onClick={handleNext}>Next</button>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <h3>Artist: {currentTrack.name}</h3>
                      <h3>Genre: {currentTrack.genre}</h3>
                    </div>
                    <button>Add to fav</button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

    </div>
  );
}