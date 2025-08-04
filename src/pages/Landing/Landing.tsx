// import React, { useEffect, useState } from 'react';
// import Style from './landing.module.css';
// import { useNavigate } from 'react-router-dom';

// type Track = {
//   id: number;
//   name: string;
//   track: number;
//   audio: string;
//   genre: string;
// };

// export default function Landing() {
//   const navigate = useNavigate();
//   const [tracks, setTracks] = useState<Track[]>([]);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   useEffect(() => {
//     fetch("/src/dummyfile.json")
//       .then((res) => res.json())
//       .then((data) => {
//         setTracks(data);
//       })
//       .catch((err) => console.error("Failed to load tracks", err));
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
//   };

//   const currentTrack = tracks[currentIndex];

//   const playlist = () => {
//     console.log("Button clicked, navigating to dashboard...");
//     navigate('/dashboard')
//   }

//   return (
//     <div>
//       {/* The outer div wrapping the banner is not strictly necessary unless you have other content */}
//       <div>
//         <div className={`${Style.banner}`} >
//           <p>Craft Your Sound. Your Way.</p>
//           <button className='mt-[30px] text-white bg-amber-800 border-none rounded-[10px] w-[150px] p-2  font-bold relative z-10' onClick={playlist}>Go to my playlist</button>
        
//         </div>

//         {/* <h2 className='text-[40px] text-amber-900 ml-3 font-bold'>New Albums</h2>
//         <div className='w-full mx-[20px]'>
//           new album section
//         </div>
//         <button onClick={() => console.log('clicked')}>Click me</button> */}
//         {/* Music Player */}
//           {tracks.length > 0 && (
//             <div className=' w-[300px] md:w-[400px] mx-auto '>
//               <div>
//                 {/* <h1 className="text-center">Music Playlist</h1> */}
//                 <div className="bg-orange-300 py-4 px-4 md:px-8 rounded-4xl mt-5">
//                   <h3 className='font-semibold'>Track {currentTrack.track}</h3>
//                   <div className="flex gap-2">
//                     <button className='hover:text-gray-700 hover:cursor-pointer' onClick={handlePrev}>Prev</button>
//                     <audio controls src={currentTrack.audio} autoPlay />
//                     <button className='hover:text-gray-700 hover:cursor-pointer' onClick={handleNext}>Next</button>
//                   </div>
//                   <div className="flex justify-between">
//                     <div className='text-sm'>
//                       <h3 className='font-semibold'>Artist: <i className='font-normal'>{currentTrack.name}</i></h3>
//                       <h3 className='font-semibold'>Genre: <i className='font-normal'>{currentTrack.genre}</i></h3>
//                     </div>
//                     <button className='hover:text-gray-700 hover:cursor-pointer'>Add to playlist</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//       </div>

//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import Style from './landing.module.css';
import { useNavigate } from 'react-router-dom';
import AddToPlaylistModal from '../../components/AddToPlaylistModal';
import { useAuth } from '../../components/dataprovider/AuthContext';
import { db } from '../../../utility/firebase'; // Adjust this path if needed
import { collection, query, where, getDocs } from 'firebase/firestore';

type Track = {
  id: number;
  name: string;
  track: number;
  audio: string;
  genre: string;
};

// Define the type for your playlists
interface Playlist {
  id: string;
  name: string;
}

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assuming useAuth is available
  
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState<boolean>(true);

  // Fetch mock tracks from a JSON file
  useEffect(() => {
    fetch("/src/dummyfile.json")
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
      })
      .catch((err) => console.error("Failed to load tracks", err));
  }, []);

  // Fetch the user's playlists from Firestore
  useEffect(() => {
    const fetchPlaylists = async () => {
      if (user) {
        const q = query(collection(db, "playlists"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedPlaylists: Playlist[] = [];
        querySnapshot.forEach((doc) => {
          fetchedPlaylists.push({ id: doc.id, name: doc.data().name });
        });
        setPlaylists(fetchedPlaylists);
        setLoadingPlaylists(false);
      }
    };
    fetchPlaylists();
  }, [user]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const currentTrack = tracks[currentIndex];

  const handleOpenAddModal = () => {
    if (!user) {
      alert("You must be logged in to add songs to a playlist.");
      return;
    }
    setShowAddModal(true);
  };
  
  const handleCloseAddModal = () => setShowAddModal(false);

  const playlist = () => {
    navigate('/dashboard')
  }

  return (
    <div>
      <div>
        <div className={`${Style.banner}`} >
          <p className='text-sm'>Craft Your Sound. Your Way.</p>
          <button className='mt-[30px] text-white bg-amber-800 border-none rounded-[10px] w-[150px] p-2  font-bold relative z-10' onClick={playlist}>Go to my playlist</button>
        </div>
        
        {tracks.length > 0 && (
          <div className=' w-[300px] md:w-[400px] mx-auto '>
            <div>
              <div className="bg-orange-300 py-4 px-4 md:px-8 rounded-4xl mt-5">
                <h3 className='font-semibold'>Track {currentTrack.track}</h3>
                <div className="flex gap-2">
                  <button className='hover:text-gray-700 hover:cursor-pointer' onClick={handlePrev}>
                    <svg
                      className='w-4 h-4' 
                      viewBox="0 -2 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>previous [#999]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-104.000000, -3805.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M59.9990013,3645.86816 L59.9990013,3652.13116 C59.9990013,3652.84516 58.8540013,3653.25316 58.2180013,3652.82516 L53.9990013,3650.14016 L53.9990013,3652.13116 C53.9990013,3652.84516 53.4260013,3653.25316 52.7900013,3652.82516 L48.4790013,3649.69316 C47.9650013,3649.34616 47.7980013,3648.65316 48.3120013,3648.30616 L52.7900013,3645.17516 C53.4260013,3644.74616 53.9990013,3645.15416 53.9990013,3645.86816 L53.9990013,3647.85916 L58.2180013,3645.17516 C58.8540013,3644.74616 59.9990013,3645.15416 59.9990013,3645.86816" id="previous-[#999]"> </path> </g> </g> </g> </g>
                    </svg>
                  </button>
                  <audio controls src={currentTrack.audio} autoPlay />
                  <button className='hover:text-gray-700 hover:cursor-pointer' onClick={handleNext}>
                    <svg
                      className='w-4 h-4' 
                      viewBox="0 -2 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>next [#998]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-144.000000, -3805.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M99.684,3649.69353 L95.207,3652.82453 C94.571,3653.25353 94,3652.84553 94,3652.13153 L94,3650.14053 L89.78,3652.82453 C89.145,3653.25353 88,3652.84553 88,3652.13153 L88,3645.86853 C88,3645.15453 89.145,3644.74653 89.78,3645.17453 L94,3647.85953 L94,3645.86853 C94,3645.15453 94.571,3644.74653 95.207,3645.17453 L99.516,3648.30653 C100.03,3648.65353 100.198,3649.34653 99.684,3649.69353" id="next-[#998]"> </path> </g> </g> </g> </g>
                    </svg>
                  </button>
                </div>
                <div className="flex justify-between">
                  <div className='text-sm'>
                    <h3 className='font-semibold'>Artist: <i className='font-normal'>{currentTrack.name}</i></h3>
                    <h3 className='font-semibold'>Genre: <i className='font-normal'>{currentTrack.genre}</i></h3>
                  </div>
                  <button 
                    className='hover:text-gray-700 hover:cursor-pointer' 
                    onClick={handleOpenAddModal}
                  >
                    Add to playlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showAddModal && currentTrack && (
        <AddToPlaylistModal 
          playlists={playlists}
          trackToAdd={currentTrack}
          onClose={handleCloseAddModal}
        />
      )}
    </div>
  );
}