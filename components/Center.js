import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';

import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtom';

import useSpotify from '../hooks/useSpotify';

import Songs from '../components/Songs';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];


function Center() {

    const spotifyApi = useSpotify();

    const { data: session } = useSession();
    const [color, setColor] = useState(null);

    const playlistId = useRecoilValue(playlistIdState);

    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {

            setPlaylist(data.body);

        })
        .catch((err) => console.log("something went wrong!",err));

    }, [spotifyApi, playlistId])

    console.log(playlist);

    useEffect( () => {
        setColor(shuffle(colors).pop());
    },[playlistId]);

  return (
    <div className='flex-grow overflow-y-scroll h-screen scrollbar-hide'>

        <header className='absolute top-5 right-8'>

            <div onClick={signOut} 
                className='sticky flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>

                <img className='rounded-full w-10 h-10' src={session?.user.image} alt='' />

                <h2 className='font-bold text-white'> {session?.user.name} </h2>

                <ChevronDownIcon className='h-5 w-5 text-white' />

            </div>

        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
            <img src={playlist?.images?.[0]?.url} alt='' 
                className='h-44 w-44 shadow-2xl text-white'/>
            
            <div>
                <p>PLAYLIST</p>
                <h1 className='text-2xl mb:text-3xl xl:text-5xl font-bold text-white'>{playlist?.name}</h1>
            </div>
        </section>

        <div>
            <Songs />
        </div>

    </div>
  )
}

export default Center