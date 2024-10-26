

import React, { useState } from 'react';

export default function Square() {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('Button clicked!');
  };

  return (
    <div>
      <button className="square" onClick={handleClick}>BUTTON</button>
      <p>{message}</p>
    </div>
  );
}
