import React from 'react';

function Stopwatch({ time }: { time: number }) {

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div>
      {formatTime(time)}
    </div>
  );
}

export default Stopwatch;
