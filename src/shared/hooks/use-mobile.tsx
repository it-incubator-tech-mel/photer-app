'use client';

import { useEffect, useState } from 'react';

// Breakpoint for mobile devices (matches Tailwind's md breakpoint)
const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    // Function to update state based on window width
    function handleResize(): void {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}
