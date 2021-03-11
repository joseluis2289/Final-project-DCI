import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  filterCategory,
  filterFree,
  filterPaid,
  searchResources,
} from "../redux/actions";
import FilterRating from "../components/FilterRating";
import { TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles({
  root: {
    fontSize: "18px",
    margin: "2px",
    fontFamily: "Roboto",
    fontWeight: "regular",
    backgroundColor: "#fff",
    color: "#706FD3",
    borderColor: "#706FD3",
    borderRadius: "0.5rem",
    width: 360,
  },
});

export default function Filter() {
  const history = useHistory();
  const classes = useStyles();
  // In the beginning all resources are shown: free, paid and all ratings.
  let initialState = {
    free: true,
    paid: true,
    rating: 0,
    general: true,
    frontend: true,
    backend: true,
    database: true,
    machineLearning: true,
    search: "",
  };
  const [filterData, setFilterData] = useState(initialState);
  const dispatch = useDispatch();

  // FILTER -- CATEGORY -- "general"
  useEffect(() => {
    if (filterData.general) dispatch(filterCategory("general", true));
    else dispatch(filterCategory("general", false));
    return () => {
      // cleanup
    };
  }, [filterData.general, dispatch]);

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

  // FILTER -- CATEGORY -- "machineLearning"
  useEffect(() => {
    if (filterData.machineLearning)
      dispatch(filterCategory("machineLearning", true));
    else dispatch(filterCategory("machineLearning", false));
    return () => {
      // cleanup
    };
  }, [filterData.machineLearning, dispatch]);

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

  function handleCheckboxChange(e) {
    setFilterData({ ...filterData, [e.target.name]: e.target.checked });
  }

  function handleSearchChange(e) {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    // e.preventDefault();
    // console.log(e.target.value);
    // dispatch(searchResources(e.target.value));
  }

  function search(e) {
    e.preventDefault();
    // console.log("Searching for...", filterData.search);
    dispatch(searchResources(filterData.search));
    history.push("/");
  }

  return (
    <section className="filter-container">
      <form className="filter-form">
        {/* Category Filter */}
        <fieldset>
          <legend>Category</legend>

          <input
            type="checkbox"
            id="general"
            name="general"
            onChange={handleCheckboxChange}
            checked={filterData.general}
          />
          <label htmlFor="general">General</label>

          <input
            type="checkbox"
            id="frontend"
            name="frontend"
            onChange={handleCheckboxChange}
            checked={filterData.frontend}
          />
          <label htmlFor="frontend">Frontend</label>

          <input
            type="checkbox"
            id="backend"
            name="backend"
            onChange={handleCheckboxChange}
            checked={filterData.backend}
          />
          <label htmlFor="backend">Backend</label>

          <input
            type="checkbox"
            id="database"
            name="database"
            onChange={handleCheckboxChange}
            checked={filterData.database}
          />
          <label htmlFor="database">Database</label>
          <input
            type="checkbox"
            id="machineLearning"
            name="machineLearning"
            onChange={handleCheckboxChange}
            checked={filterData.machineLearning}
          />
          <label htmlFor="machineLearning">Machine Learning</label>
        </fieldset>

        {/* Paid/Free Filter */}
        <fieldset>
          <legend>Is paid?</legend>
          <input
            type="checkbox"
            name="free"
            id="filter-free"
            onChange={handleCheckboxChange}
            checked={filterData.free}
          />
          <label htmlFor="filter-free">Free</label>

          <input
            type="checkbox"
            name="paid"
            id="filter-paid"
            onChange={handleCheckboxChange}
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
      </form>

      <form className="search-form" action="" method="post" onSubmit={search}>
        {/* Search Field */}
        <fieldset className="search-container">
          <TextField
            className={classes.root}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            type="search"
            name="search"
            placeholder="Search"
            size="small"
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            onChange={handleSearchChange}
          /> */}

          <button type="submit">Search</button>
        </fieldset>
      </form>
    </section>
  );
}
