import React from 'react';

export default (props) => {
  const { className, title, children } = props;
  return (
    <div className={ className }>
      <h1>{ title }</h1>
      { children }
    </div>
  );
};
