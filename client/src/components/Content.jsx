import React, { useEffect } from "react";
import { connect } from "react-redux";
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

  return (
    <div className='references-container'>
      <React.Fragment>
        {resources.map((item, index) => {
          let showResource = false;
          if (filter.free === true && item.paid === false) {
            console.log(filter.free, item.paid);
            showResource = true;
          }
          if (filter.paid === true && item.paid === true) {
            console.log(filter.paid, item.paid);
            showResource = true;
          }
          if (item.rating < filter.rating) {
            showResource = false;
          }
          if (showResource)
            return <Resource id={index} key={index} data={item} />;
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
