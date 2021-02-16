import React, { useEffect } from "react";
import { useSelector, connect } from "react-redux";
import Resource from "./Resource";
import PropTypes from "prop-types";
import { getResources } from "../redux/actions";

const Content = ({ getResources, resources, filter }) => {
  let resourceIndex = [0, 1, 2, 3, 4, 5, 6, 7];
  // useEffect: on first Component load get top X number of references
  // into the Redux store and display them with React

  useEffect(() => {
    getResources();
    console.log(resources);
  }, []);

  // TODO: once a Search or a Filter is applied, change the display accordingly

  return (
    <div className='references-container'>
      <React.Fragment>
        {/* {resources.map((item) => (
          <p>{item.title}</p>
        ))} */}
        {resourceIndex.map((index) => {
          let showResource = false;
          if (filter.free === true && resources[index].paid === "free") {
            console.log(filter.free, resources[index].paid);
            showResource = true;
          }
          if (filter.paid === true && resources[index].paid === "paid") {
            console.log(filter.paid, resources[index].paid);
            showResource = true;
          }
          if (resources[index].rating < filter.rating) {
            showResource = false;
          }
          if (showResource)
            return <Resource id={index} key={index} data={resources[index]} />;
          return "";
        })}
      </React.Fragment>
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
