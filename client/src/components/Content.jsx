import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import Resource from "./Resource";

export default function Content() {
  const login = useSelector((state) => state.username);
  // useEffect: on first Component load get top X number of references
  // into the Redux store and display them with React

  useEffect(
    () => {
      console.log("useEffect triggered!");
      //   effect
      return () => {
        //   cleanup
      };
    },
    [
      /*input*/
    ]
  );

  // once a Search or a Filter is applied, change the display accordingly
  return (
    <div className="references-container">
      {login ? (
        <React.Fragment>
          <Resource id={0} />
          <Resource id={1} />
        </React.Fragment>
      ) : (
        <Welcome />
      )}
    </div>
  );
}
