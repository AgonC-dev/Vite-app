import React from 'react';

export default function Input({ label, id, ...props }) {
  // Use a unique ID for better accessibility if not provided
  const inputId = id || label.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="input-field"> {/* This div is crucial for styling */}
      <input id={inputId} {...props} placeholder=" " /> {/* Add placeholder=" " for the floating label effect */}
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
}