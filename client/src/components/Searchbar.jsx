import React, { useState } from "react";

export default function Searchbar() {
  // Hook for storing SEARCH TERM and FILTER SETTINGS
  const [searchData, setSearchData] = useState();

  // Function for handling input in the search bar.
  function handleChange(e) {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  }

  return (
    <form
      className='searchbar-form'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor='search'>or search something:</label>
      <input
        type='search'
        name='search'
        id='search'
        placeholder='Search...'
        onChange={handleChange}
      />

      <button type='submit'>Search</button>
    </form>
  );
}
