import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterFree, filterPaid, filterRating } from "../redux/actions";
import Rating from "../components/Rating";

export default function Filter() {
  let initialState = {
    free: true,
    paid: true,
    rating: 0,
  };
  const [filterData, setFilterData] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filterData.free) dispatch(filterFree(true));
    else dispatch(filterFree(false));
    return () => {
      // cleanup
    };
  }, [filterData.free, dispatch]);

  useEffect(() => {
    if (filterData.paid) dispatch(filterPaid(true));
    else dispatch(filterPaid(false));
    return () => {
      // cleanup
    };
  }, [filterData.paid, dispatch]);

  useEffect(() => {
    if (filterData.rating) dispatch(filterRating(filterData.rating));
    return () => {
      // cleanup
    };
  }, [filterData.rating, dispatch]);

  function handleChange(e) {
    setFilterData({ ...filterData, [e.target.name]: e.target.checked });
  }
  function handleRatingChange(e) {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  }

  return (
    <React.Fragment>
      <form className='filter-form'>
        <div name='category'>
          <label>Category</label>
          <label htmlFor='frontend'>
            <input type='checkbox' name='category' value='frontend' />
            Frontend
          </label>
          <label htmlFor='backend'>
            <input type='checkbox' name='category' value='backend' />
            Backend
          </label>
          <label htmlFor='database'>
            <input type='checkbox' name='category' value='database' />
            Database
          </label>
          <label htmlFor='general'>
            <input type='checkbox' name='category' value='general' />
            General
          </label>
        </div>
        <div>
          <label>Is paid?</label>
          <input
            type='checkbox'
            name='free'
            id='filter-free'
            onChange={handleChange}
            checked={filterData.free}
          />
          <label htmlFor='filter-free'>Free</label>
          <input
            type='checkbox'
            name='paid'
            id='filter-paid'
            onChange={handleChange}
            checked={filterData.paid}
          />
          <label htmlFor='filter-paid'>Paid</label>
        </div>
        <div>
          <legend>
            <strong>Rating:</strong>
          </legend>
          (Component Test)
          <Rating usedInFilter={true} />
          (Redux Test)
          <input
            type='radio'
            name='rating'
            id='rating-4'
            value='4'
            onChange={handleRatingChange}
          />
          <label htmlFor='rating-4'>4</label>
          <input
            type='radio'
            name='rating'
            id='rating-5'
            value='5'
            onChange={handleRatingChange}
          />
          <label htmlFor='rating-5'>5</label>
        </div>
      </form>
    </React.Fragment>
  );
}
