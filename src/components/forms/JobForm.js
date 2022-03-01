/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useRef } from 'react';

function JobForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });

    setInput('');
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update Your Item"
            value={input}
            name="text"
            className="job-input edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <button type="submit" className="job-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add a Job"
            value={input}
            name="text"
            className="job-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button type="submit" className="job-button">
            Add Job
          </button>
        </>
      )}
    </form>
  );
}

export default JobForm;
