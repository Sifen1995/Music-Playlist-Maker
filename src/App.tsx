import { useEffect, useState } from "react";
import Routing from '../Routing'; // Import your Routing component

type Track = {
  id: number;
  name: string;
  track: number;
  audio: string;
  genre: string;
};

function App() {

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



  return (
    <>
      <div className="flex w-[500px] justify-center items-center h-screen m-auto">
        <div>
          <h1 className="text-center">Music Playlist</h1>
          {tracks.length > 0 &&
            <div className="bg-orange-300 py-4 px-8 rounded-4xl">
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
          }
        </div>
      </div>
      <Routing />
    </>
  )
}


