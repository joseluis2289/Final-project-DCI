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

  useEffect(() => {
    getResources();
  }, [getResources]);

  // TODO: once a Search or a Filter is applied, change the display accordingly

  // const resourcesPerPage = 8;
  // const [pageNr, setPageNr] = useState(1);
  // const nrOfPages = Math.ceil(resources.length / resourcesPerPage);
  // let pagination = [];

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
        {/* <section className="pagination">
        {pageNr} of {nrOfPages} /
        {[1, 2].map((i) => (
          <button
            key={i}
            href="#"
            onClick={() => {
              setPageNr(i);
            }}
          >
            {i}
          </button>
        ))}
      </section> */}
        {/* THIS SHOULD HAPPEN AFTER FILTER, NOT BEFORE! */}
        {resources.map((item, index) => {
          // if (
          //   index > (pageNr - 1) * resourcesPerPage &&
          //   index < pageNr * resourcesPerPage
          // ) {
          /* let showByCategory = false;
          let showByRating = false;
          let showByCost = false;

          // FILTER FOR CATEGORIES
          let categories = ["frontend", "backend", "database", "general"];
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
          // If resource matches all filter criteria, it is displayed
          if (showByCost && showByRating && showByCategory)
            return (
              <Resource id={index} key={index} data={item} author="false" />
            );
          return "";
          // } else return "";
 */
          <Resource id={item._id} key={index} data={item} author="false" />;
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
