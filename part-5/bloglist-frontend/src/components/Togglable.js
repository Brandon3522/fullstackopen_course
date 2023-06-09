import React from 'react';
import { useState } from 'react';

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  const setVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={setVisibility}>Cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={setVisibility}>{props.buttonLabel}</button>
      </div>
    </>
  );
};

export default Togglable;
