import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Form,
  Checkbox,
  Rating,
  Header,
  Button,
  // Container,
} from "semantic-ui-react";
import {
  filterCategory,
  filterFree,
  filterPaid,
  filterRating,
  searchResources,
  getResources,
} from "../redux/actions";
import "./Filter.css";

export default function Filter() {
  const history = useHistory();
  // In the beginning all resources are shown: free, paid and all ratings.
  let initialState = {
    free: true,
    paid: true,
    rating: 1,
    general: true,
    frontend: true,
    backend: true,
    database: true,
    search: "",
  };
  const dispatch = useDispatch();
  // React Hook to store the active filter settings
  const [filterData, setFilterData] = useState(initialState);
  // React Hook to store state of Semantic UI React - Rating component
  const [rating, setRating] = useState(false);
  // Function that handles the changes of the Rating component
  function onFilterRating(e, { rating, maxRating }) {
    setRating(rating);
  }

  // FILTER -- RATING
  useEffect(() => {
    if (rating) dispatch(filterRating(rating));
    return () => {
      // cleanup
    };
  }, [rating, dispatch]);

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
    <React.Fragment>
      <Grid as="section">
        {/* ---------- SEARCH BAR ---------- */}
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={12}>
            <Form size="big">
              <Form.Input
                focus
                icon="search"
                iconPosition="left"
                type="search"
                name="search"
                id="search"
                placeholder='Search... (for example "React", or "Git")'
                onChange={(e) => {
                  e.preventDefault();
                  setFilterData(initialState);
                  if (e.target.value === "") {
                    dispatch(getResources());
                  } else {
                    dispatch(searchResources(e.target.value));
                    history.push("/");
                  }
                }}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={2} divided padded="horizontally">
        {/* ---------- FILTER ---------- */}
        <Grid.Row className="filter-container">
          <Grid.Column>
            <Header as="h3">Filter by Category</Header>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <Checkbox
                    toggle
                    id="general"
                    name="general"
                    onChange={handleCheckboxChange}
                    checked={filterData.general}
                    label={<label>General</label>}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    id="frontend"
                    name="frontend"
                    onChange={handleCheckboxChange}
                    checked={filterData.frontend}
                    label={<label>Frontend</label>}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <Checkbox
                    toggle
                    id="backend"
                    name="backend"
                    onChange={handleCheckboxChange}
                    checked={filterData.backend}
                    label={<label>Backend</label>}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    id="database"
                    name="database"
                    onChange={handleCheckboxChange}
                    checked={filterData.database}
                    label={<label>Database</label>}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Filter by Price</Header>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <Checkbox
                    toggle
                    name="free"
                    id="filter-free"
                    onChange={handleCheckboxChange}
                    checked={filterData.free}
                    label={<label>Free</label>}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    name="paid"
                    id="filter-paid"
                    onChange={handleCheckboxChange}
                    checked={filterData.paid}
                    label={<label>Paid</label>}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
            <Header as="h3" className="rating-header">
              Filter by Rating
            </Header>
            <Rating
              maxRating={5}
              defaultRating={0}
              icon="star"
              size="huge"
              onRate={onFilterRating}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}
