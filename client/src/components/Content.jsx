import React, { useState, useEffect, Fragment } from "react";
import { useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import Resource from "./Resource";
import PropTypes from "prop-types";
import { getResources } from "../redux/actions";
import AddResources from "./AddResource";

const Content = ({ getResources, resources, filter }) => {
  // useEffect: on first Component load get top X number of references
  // into the Redux store and display them with React
  const [firstPageLoad, setFirstPageLoad] = useState(true);
  useEffect(() => {
    if (firstPageLoad) {
      getResources();
      console.log(resources);
      setFirstPageLoad(false);
    }
  }, []);

  // TODO: once a Search or a Filter is applied, change the display accordingly

  // PAGINATION
  const [pagination, setPagination] = useState({
    perPage: 8,
    current: 1,
    max: 1,
    display: [1],
  });

  // Whenever the resources change (for example by searching)
  // the nr of max pages is calculated again. Also the display array
  // needed to render the buttons is created again, based on the new
  // number of pages.
  useEffect(() => {
    const maxPages = Math.ceil(resources.length / pagination.perPage);
    let pageDisplay = [];
    for (let i = 1; i <= maxPages; i++) {
      pageDisplay.push(i);
    }
    setPagination({ ...pagination, max: maxPages, display: pageDisplay });
    return () => {
      // cleanup
    };
  }, [resources]);

  function handlePageChange(e) {
    setPagination({
      ...pagination,
      current: parseInt(e.target.id.replace("page-", "")),
    });
  }

  return (
    <Fragment>
      <Link to="/add_resource">
        <img
          className="icon"
          src="icons/icon_add_resource.svg"
          alt="Login Icon"
        />
        AddResource
      </Link>
      <div className="references-container">
        <section className="pagination">
          Found <strong>{resources.length}</strong> Entries / Page:{" "}
          {pagination.current} of {pagination.max} /
          {pagination.display.map((index) => {
            return (
              <button
                key={index}
                id={"page-" + index}
                onClick={handlePageChange}
                className={index === pagination.current ? "active" : null}
              >
                {index}
              </button>
            );
          })}
        </section>

        {resources.map((item, index) => {
          let showByCategory = false;
          let showByRating = false;
          let showByCost = false;
          let showByCurrentPage = false;

          // FILTER FOR CATEGORIES
          let categories = [
            "general",
            "frontend",
            "backend",
            "database",
            "machineLearning",
          ];
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
          let start = (pagination.current - 1) * pagination.perPage;
          let end = pagination.current * pagination.perPage - 1;
          console.log(start, end);
          if (index >= start && index <= end) {
            showByCurrentPage = true;
          }

          // If resource matches all filter criteria, it is displayed
          if (showByCost && showByRating && showByCategory && showByCurrentPage)
            return (
              <Resource id={item._id} key={index} data={item} author="false" />
            );
          return "";
          // } else return "";
        })}
      </div>
    </Fragment>
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
