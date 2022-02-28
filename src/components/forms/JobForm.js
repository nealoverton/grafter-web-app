import React, { useState } from 'react';

function JobForm(props) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // props.onSubmit({
    //   id: Math.floor(Math.random() * 10000),
    //   text: input
    // });

    setInput('');
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a Job"
        value={input}
        name="text"
        className="job-input"
        onChange={handleChange}
      />
      <button type="submit" className="job-button">
        Add Job
      </button>
    </form>
  );
}

export default JobForm;
