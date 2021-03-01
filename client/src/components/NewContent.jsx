import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getResources } from "../redux/actions";
import PropTypes from "prop-types";
import Resource from "./Resource";

function NewContent() {
  const resources = useSelector((state) => state.resources);
  const filter = useSelector((state) => state.filter);

  const [firstPageLoad, setFirstPageLoad] = useState(true);

  // useEffect: on first Component load get top X number of references
  // into the Redux store and display them with React
  useEffect(() => {
    if (firstPageLoad) {
      // Loads resources from database into Redux store
      getResources();
      setFirstPageLoad(false);
    }
    console.log(resources);
  }, [firstPageLoad, resources]);

  // TODO: once a Search or a Filter is applied, change the display accordingly

  const [pageNr, setPageNr] = useState(1);
  //   const resourcesPerPage = 8;
  // const nrOfPages = Math.ceil(resources.length / resourcesPerPage);

  return (
    <div className="references-container">
      <section className="pagination">{pageNr}</section>
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
          return <Resource id={index} key={index} data={item} />;
        return "";
        // } else return "";
      })}
    </div>
  );
}

NewContent.propTypes = {
  getResources: PropTypes.func.isRequired,
  resources: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
};

export default NewContent;
