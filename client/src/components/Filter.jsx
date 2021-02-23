import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterCategory, filterFree, filterPaid } from "../redux/actions";
import FilterRating from "../components/FilterRating";

export default function Filter() {
  // In the beginning all resources are shown: free, paid and all ratings.
  let initialState = {
    free: true,
    paid: true,
    rating: 0,
    frontend: true,
    backend: true,
    database: true,
    general: true,
  };
  const [filterData, setFilterData] = useState(initialState);
  const dispatch = useDispatch();

  // FILTER -- CATEGORY -- "frontend"
  useEffect(() => {
    if (filterData.frontend) dispatch(filterCategory("frontend", true));
    else dispatch(filterCategory("frontend", false));
    return () => {
      // cleanup
    };
  }, [filterData.frontend, dispatch]);

  // FILTER -- CATEGORY -- "backend"
  useEffect(() => {
    if (filterData.backend) dispatch(filterCategory("backend", true));
    else dispatch(filterCategory("backend", false));
    return () => {
      // cleanup
    };
  }, [filterData.backend, dispatch]);

  // FILTER -- CATEGORY -- "database"
  useEffect(() => {
    if (filterData.database) dispatch(filterCategory("database", true));
    else dispatch(filterCategory("database", false));
    return () => {
      // cleanup
    };
  }, [filterData.database, dispatch]);

  // FILTER -- CATEGORY -- "general"
  useEffect(() => {
    if (filterData.general) dispatch(filterCategory("general", true));
    else dispatch(filterCategory("general", false));
    return () => {
      // cleanup
    };
  }, [filterData.general, dispatch]);

  // FILTER -- FREE RESOURCES
  useEffect(() => {
    if (filterData.free) dispatch(filterFree(true));
    else dispatch(filterFree(false));
    return () => {
      // cleanup
    };
  }, [filterData.free, dispatch]);

  // FILTER -- PAID RESOURCES
  useEffect(() => {
    if (filterData.paid) dispatch(filterPaid(true));
    else dispatch(filterPaid(false));
    return () => {
      // cleanup
    };
  }, [filterData.paid, dispatch]);

  function handleChange(e) {
    setFilterData({ ...filterData, [e.target.name]: e.target.checked });
  }

  return (
    <React.Fragment>
      <form className="filter-form">
        {/* Category Filter */}
        <fieldset>
          <legend>Category</legend>
          <input
            type="checkbox"
            id="frontend"
            name="frontend"
            onChange={handleChange}
            checked={filterData.frontend}
          />
          <label htmlFor="frontend">Frontend</label>

          <input
            type="checkbox"
            id="backend"
            name="backend"
            onChange={handleChange}
            checked={filterData.backend}
          />
          <label htmlFor="backend">Backend</label>

          <input
            type="checkbox"
            id="database"
            name="database"
            onChange={handleChange}
            checked={filterData.database}
          />
          <label htmlFor="database">Database</label>

          <input
            type="checkbox"
            id="general"
            name="general"
            onChange={handleChange}
            checked={filterData.general}
          />
          <label htmlFor="general">General</label>
        </fieldset>

        {/* Paid/Free Filter */}
        <fieldset>
          <legend>Is paid?</legend>
          <input
            type="checkbox"
            name="free"
            id="filter-free"
            onChange={handleChange}
            checked={filterData.free}
          />
          <label htmlFor="filter-free">Free</label>

          <input
            type="checkbox"
            name="paid"
            id="filter-paid"
            onChange={handleChange}
            checked={filterData.paid}
          />
          <label htmlFor="filter-paid">Paid</label>
        </fieldset>

        {/* Rating Filter */}
        <fieldset>
          <legend>
            <strong>Rating:</strong>
          </legend>
          <FilterRating />
        </fieldset>

        {/* Search Field */}
        <fieldset className="search-container">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            onChange={handleChange}
          />

          <button type="submit">Search</button>
        </fieldset>
      </form>
    </React.Fragment>
  );
}
