import { useState } from 'react';

export function Switch() {
  const [disabled, setDisabled] = useState(false);
  const [on, setOn] = useState(false);

  const handleClick = () => {
    setDisabled(true);
    const timer = setTimeout(() => {
      setOn(!on);
      setDisabled(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  return (
    <button disabled={disabled} onClick={handleClick}>
      {on ? 'ON' : 'OFF'}
    </button>
  );
}
