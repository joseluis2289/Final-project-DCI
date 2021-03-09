import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  filterCategory,
  filterFree,
  filterPaid,
  filterRating,
  searchResources,
} from "../redux/actions";
// import FilterRating from "../components/FilterRating";
import {
  Grid,
  Form,
  Checkbox,
  Rating,
  Header,
  Container,
} from "semantic-ui-react";
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
  const [filterData, setFilterData] = useState(initialState);
  const [rating, setRating] = useState(false);
  const dispatch = useDispatch();

  // const onSaveRating = (index) => {
  //   setRating(index);
  // };

  function onSaveRating(e, { rating, maxRating }) {
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
    <Grid columns={2} as="section">
      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={12}>
          <Form size="big" onSubmit={search}>
            <Form.Input
              icon="search"
              iconPosition="left"
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="filter-container">
        <Grid.Column width={8}>
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
        <Grid.Column width={8}>
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
          <Header as="h3">Filter by Rating</Header>
          <Container fluid>
            <Rating
              maxRating={5}
              defaultRating={0}
              icon="star"
              size="huge"
              onRate={onSaveRating}
            />
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
