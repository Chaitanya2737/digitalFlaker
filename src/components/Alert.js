import React from 'react';

const Alert = ({ value }) => {
  return (
    <div className="grid justify-center align-bottom">
      <div className="bg-danger text-white rounded-lg p-4 shadow-lg">
        <h3>{value}</h3>
      </div>
    </div>
  );
}

export default Alert;
