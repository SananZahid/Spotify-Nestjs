
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';
import Player from '../components/Player';
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden" >
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex' >
          {/* SideBar */}
          <Sidebar />
          {/* Center */}
          <Center />
      </main>

      <div className='sticky bottom-0'> 
        {/* Player  */}
        <Player />
      </div>
      
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  return {
    props: {
      session,
    },
  }
}


