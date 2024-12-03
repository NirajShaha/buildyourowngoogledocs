import React from 'react'
import { Navbar } from './navbar'
import Link from 'next/link';
const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-6'>
      <Navbar />
      </div>
      <div className='mt-16'>
        Click <Link href="/documents/123">
          <span className='text-blue-500 underline'>&nbsp;here&nbsp;</span>
        </Link> to go to document
      </div>
    </div>
  );
};

export default Home
