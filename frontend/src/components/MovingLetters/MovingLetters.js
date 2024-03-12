import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLetters } from '../../actions/getLetters';
import './MovingLetters.css';

const MovingLetters = () => {
  const dispatch = useDispatch();
  const [lettersArray, setLettersArray] = useState([]);
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);

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
    if (!containerRef.current) {
      return;
    }

    const containerWidth = containerRef.current.clientWidth;
    const lineWidth = lettersArray.join('').length * 20; // Assuming 20px per letter
    const maxPosition = Math.max(0, containerWidth - lineWidth);

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
      // Cleanup logic if needed
    };
  }, [lettersArray, containerRef]);

  return (
    <div className="moving-letters-container" ref={containerRef}>
      <div className="moving-line" style={{ left: `${position}px` }}>
        {lettersArray.join('')}
      </div>
    </div>
  );
};

export default MovingLetters;
