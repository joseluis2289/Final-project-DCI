import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Resource from "./Resource";
import { getResources } from "../redux/actions";

export default function Content() {
  const login = useSelector((state) => state.username);
  const resourceData = useSelector((state) => state.resources);
  const filter = useSelector((state) => state.filter);
  let resourceIndex = [0, 1, 2, 3, 4, 5, 6, 7];
  // useEffect: on first Component load get top X number of references
  // into the Redux store and display them with React

  useEffect(() => {
    getResources();
  }, []);

  // TODO: once a Search or a Filter is applied, change the display accordingly

  return (
    <div className='references-container'>
      <React.Fragment>
        {/* {resourceIndex.map((index) => {
          let showResource = false;
          if (filter.free === true && resourceData[index].paid === "free") {
            console.log(filter.free, resourceData[index].paid);
            showResource = true;
          }
          if (filter.paid === true && resourceData[index].paid === "paid") {
            console.log(filter.paid, resourceData[index].paid);
            showResource = true;
          }
          if (resourceData[index].rating < filter.rating) {
            showResource = false;
          }
          if (showResource)
            return (
              <Resource id={index} key={index} data={resourceData[index]} />
            );
          return "";
        })} */}
      </React.Fragment>
    </div>
  );
}
