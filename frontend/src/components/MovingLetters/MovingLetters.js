import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLetters } from '../../actions/get-letters-action';
import './MovingLetters.css';

const MovingLetters = () => {
  const dispatch = useDispatch();
  const [lettersArray, setLettersArray] = useState([]);
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);
  const [maxPosition, setMaxPosition] = useState(0);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await dispatch(getLetters());
        setLettersArray(data.lettersArray);
      } catch (error) {
        console.error('Error fetching letters:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) {
        return;
      }

      const containerWidth = containerRef.current.clientWidth;
      const lineWidth = lettersArray.join('').length * 25; // Assuming 30px per letter
      const newMaxPosition = Math.max(0, containerWidth - lineWidth);
      setMaxPosition(newMaxPosition);
    };

    // Call handleResize once initially
    handleResize();

    // Listen to window resize event
    window.addEventListener('resize', handleResize);

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = (elapsed / 1000) % 30; // Adjust to match the CSS duration
      const newPosition = (progress * maxPosition) / 30;

      // Handle loop-around
      setPosition(Math.round(newPosition));

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [lettersArray, containerRef, maxPosition]);

  return (
    <div className="moving-letters-container" ref={containerRef}>
      <div className="moving-line" style={{ left: `${position}px` }}>
        {lettersArray.join('')}
      </div>
    </div>
  );
};

export default MovingLetters;
