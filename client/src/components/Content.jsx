import React, { useState, useEffect } from "react";
import { useSelector, connect } from "react-redux";
import Resource from "./Resource";
import PropTypes from "prop-types";
import { getResources } from "../redux/actions";

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
        let showByCategory = false;
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
          return <Resource id={index} key={index} data={item} author="false" />;
        return "";
        // } else return "";
      })}
    </div>
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
