import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

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
        <button className='createBlog-button' onClick={setVisibility}>{props.buttonLabel}</button>
      </div>
    </>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
