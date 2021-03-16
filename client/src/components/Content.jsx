import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Resource from "./Resource/Resource";
import PropTypes from "prop-types";
import { getResources } from "../redux/actions";

import {
  Button,
  Container,
  // Icon,
  // Pagination,
  Header,
  Grid,
} from "semantic-ui-react";
import Filter from "./Filter";
import NotFound from "./NotFound";
import "./Content.css";

const Content = ({ getResources, resources, filter }) => {
  // When page loads for the first time, load resources from the database
  // into the Redux store. From there they are displayed with React.
  const [firstPageLoad, setFirstPageLoad] = useState(true);
  const searchedResources = useSelector((state) => state.searchedResources);
  const update = useSelector((state) => state.update);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    console.log(searchedResources);
    getResources();
  }, [update, getResources]);

  return (
    <React.Fragment>
      <Container textAlign={"center"} className="intro-text">
        <img src="./images/logo_200x200.png" alt="Logo" className="logo" />
        {/* Logo Source: https://editor.freelogodesign.org/?lang=en&logo=4ff63ae3-b5d0-4e0d-8eac-d4a7d7892daa */}
        <p>
          Search <strong>material</strong> for a specific web development{" "}
          <strong>topic</strong> ...
        </p>
      </Container>
      {error === {} ? <NotFound /> : <Filter />}
      <Grid doubling padded columns={2} className="references-container">
        <Grid.Row>
          <Grid.Column>
            <Link to="/add_resource">
              <Button
                style={{ width: "150px" }}
                content="Add Resource"
                icon="add circle"
                labelPosition="left"
                primary
                floated="right"
                marginTop="2em !important"
              />
            </Link>
            <section className="pagination">
              Found <strong>{resources.length}</strong> Entries
            </section>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {searchedResources.map((item, index) => {
            let showByCategory = false;
            let showByRating = false;
            let showByCost = false;
            // let showByCurrentPage = false;

            // FILTER FOR CATEGORIES
            let categories = ["general", "frontend", "backend", "database"];
            categories.forEach((cat) => {
              if (filter[cat] === true && item.category.includes(cat)) {
                showByCategory = true;
              }
            });

            // FILTER FOR FREE/PAID RESOURCES

            if (filter.free === true && item.paid === false) {
              showByCost = true;
            }
            if (filter.paid === true && item.paid === true) {
              showByCost = true;
            }

            // FILTER FOR RATING
            if (Math.floor(item.rating) >= filter.rating) {
              showByRating = true;
            }

            // FILTER BY CURRENT PAGE
            // page 1 -- index: 0-7
            // page 2 -- index: 8-15
            // let start = (pagination.current - 1) * pagination.perPage;
            // let end = pagination.current * pagination.perPage - 1;
            // if (index >= start && index <= end) {
            //   showByCurrentPage = true;
            // }
            // If resource matches all filter criteria, it is displayed
            if (
              showByCost &&
              showByRating &&
              showByCategory
              // && showByCurrentPage
            )
              return (
                <Grid.Column key={item._id}>
                  <Resource id={item._id} data={item} />
                </Grid.Column>
              );
            return "";
            // } else return "";
          })}
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

Content.propTypes = {
  getResources: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  resources: state.resources,
  filter: state.filter,
});
export default connect(mapStateToProps, { getResources })(Content);
