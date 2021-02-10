import React, { useState } from "react";

export default function Searchbar() {
  // Hook for storing SEARCH TERM and FILTER SETTINGS
  const [searchData, setSearchData] = useState();

  // Function for handling input in the search bar.
  function handleChange(e) {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  }

  return (
    <section className="searchbar-container">
      <form
        className="searchbar-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          onChange={handleChange}
        />
        <input type="checkbox" name="free" id="free" onChange={handleChange} />
        <label htmlFor="free">Free</label>
        <input type="checkbox" name="paid" id="paid" onChange={handleChange} />
        <label htmlFor="paid">Paid</label>

        <button type="submit">Search</button>
      </form>
    </section>
  );
}
