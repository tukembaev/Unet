import React, { useEffect, useRef } from 'react';

function YourComponent () {
  const blockRef = useRef(null);

  const funcTest = () => {
    // console.log(123)
  }
  const handleScroll = () => {
    if (blockRef.current.scrollTop === 0) {
        funcTest()
    }
  };

  useEffect(() => {
    const blockElement = blockRef.current;
    blockElement.addEventListener('scroll', handleScroll);

    return () => {
      blockElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={blockRef}
      style={{
        height: '200px',
        width: '300px',
        overflow: 'auto',
        border: '1px solid #ccc',
      }}
    >
      <div style={{ height: '400px' }}>
        <p>Прокрутите этот блок</p>
      </div>
    </div>
  );
}

export default YourComponent ;
