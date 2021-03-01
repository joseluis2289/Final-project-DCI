import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import UpdateResource from "./UpdateResource";
import Settings from "./Settings";

export default function MyResources() {
  const user = useSelector((state) => state.user);
  const [userResources, setUserResources] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/resources/${user._id}`)
      .then((res) => {
        setUserResources(res.data.resources);
        console.log(res.data.resources);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Fragment>
      <Settings />
      {userResources ? (
        <div className="references-container ">
          {userResources.map(
            (resource) =>
              !resource.deleted && (
                <UpdateResource
                  id={resource._id}
                  data={resource}
                  author={true}
                />
              )
          )}
        </div>
      ) : (
        <Fragment>
          <h1>Go to Login</h1>
          <Link to="/login">here </Link>
        </Fragment>
      )}
    </Fragment>
  );
}
