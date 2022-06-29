import React, { useEffect, useState } from 'react';
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    
    RssIcon,
} from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';

import useSpotify from '../hooks/useSpotify';

import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtom';


function Sidebar() {

    const {data: session, status} = useSession();


    const spotifyApi = useSpotify();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    },[session, spotifyApi])

    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    console.log(playlistId);

    // console.log(playlists);

    

    // console.log(session);
    
  return (
    <div className='text-gray-500 p-5 border-r border-gray-900 overflow-y-scroll h-screen 
                    scrollbar-hide text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex
                    pb-36'>
        <div className='space-y-4'>

            

            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className="h-5 w-5" />
                <p>Home</p>
            </button>
            
            <button className='flex items-center space-x-2 hover:text-white'>
                <SearchIcon className="h-5 w-5" />
                <p>Search</p>
            </button>
            
            <button className='flex items-center space-x-2 hover:text-white'>
                <LibraryIcon className="h-5 w-5" />
                <p>Your Library</p>
            </button>
            
            <hr className='border-t-[0.1px] border-x-gray-900'/>
            




            <button className='flex items-center space-x-2 hover:text-white'>
                <PlusCircleIcon className="h-5 w-5" />
                <p>Create Playlist</p>
            </button>

             <button className='flex items-center space-x-2 hover:text-white'>
                <HeartIcon className="h-5 w-5 text-blue-500" />
                <p>Like Songs</p>
            </button>

            <button className='flex items-center space-x-2 hover:text-white'>
                <RssIcon className="h-5 w-5 text-green-500" />
                <p>Your Episodes</p>
            </button>
            
            <hr className='border-t-[0.1px] border-x-gray-900'/>
            

            {/* Custom Playlist */}

            {playlists.map((playlist) => (

               <p key={playlist.id}
                    onClick={() => setPlaylistId(playlist.id)} 
                    className='cursor-pointer hover:text-white'>
                    {playlist.name}
                </p> 

            ))}
            

            
        </div>
    </div>
  )
}

export default Sidebar    