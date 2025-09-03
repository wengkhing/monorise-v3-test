'use client';

import { useInterruptiveLoadStore } from '@monorise/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PropagateLoader } from 'react-spinners';

const GlobalLoader = () => {
  const { isLoading, message } = useInterruptiveLoadStore();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!isLoading && mount) {
      setTimeout(() => {
        setMount(false);
      }, 100);
    } else if (!mount && isLoading) {
      setMount(true);
    }
  }, [isLoading, mount]);

  const renderLoader = () => {
    return (
      <div
        data-state={isLoading ? 'open' : 'closed'}
        className='flex items-center fixed z-[110] h-screen w-screen bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
      >
        <div className='w-screen h-1/3 flex flex-col items-center justify-center bg-[#fff]'>
          <div className='flex items-center justify-center h-16 mb-4 mr-4'>
            <PropagateLoader loading={true} />
          </div>
          <span className='text-center text-sm'>{message}</span>
        </div>
      </div>
    );
  };

  return mount
    ? createPortal(
        renderLoader(),
        document.querySelector('#loader-portal') as HTMLElement,
      )
    : null;
};

export default GlobalLoader;
