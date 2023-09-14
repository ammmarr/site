import React, { useState, useRef, SyntheticEvent, useEffect } from 'react';

interface ScrollableListProps {
  items: string[];
}

const ScrollableList: React.FC<ScrollableListProps> = ({ items }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft,
        behavior: 'smooth',
      });
    }
    
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const containerWidth = scrollContainerRef.current.offsetWidth;
      const maxScrollLeft = scrollWidth - containerWidth;
      
      let newScrollLeft = scrollContainerRef.current.scrollLeft + containerWidth;
      console.log(maxScrollLeft,newScrollLeft)
      if (newScrollLeft <= maxScrollLeft) {
        newScrollLeft = 0; // Scroll back to the beginning
      }

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = (e: SyntheticEvent<HTMLDivElement>) => {
    if (e.currentTarget && e.currentTarget.scrollLeft) {
      setScrollPosition(e.currentTarget.scrollLeft);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleScrollRight();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-row items-center relative h-[150px] w-full">
      <button
        className="rounded-full absolute left-1 bottom-[-50px]"
        disabled={scrollPosition === 0}
        onClick={handleScrollLeft}
      >
        <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.2" cx="21" cy="21" r="21" transform="matrix(-1 0 0 1 42 0.5)" fill="#EBEBEC" />
          <path
            d="M24 14.5L17 21.5L24 28.5"
            stroke="#B9C4D5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={scrollContainerRef}
        className="flex absolute w-full  align-middle right-2 bottom-0 flex-nowrap overflow-x-scroll space-x-4 no-scrollbar"
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 rounded-lg flex items-end justify-center w-[20vw]">
            <img className="mr-[42px] w-fit object-cover rounded-lg" src={item} alt="hero" />
          </div>
        ))}
      </div>
      <button
        className="px-4 absolute right-0 bottom-[-50px] rounded-full"
        onClick={handleScrollRight}
      >
        <svg width="42" height="43" viewBox="0 0 42 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle opacity="0.2" cx="21" cy="21.5" r="21" fill="#EBEBEC" />
          <path
            d="M18 14.5L25 21.5L18 28.5"
            stroke="#B9C4D5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollableList;