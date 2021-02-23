import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateResource from "../Settings/UpdateResource";

export default function MyResources() {
  const userId = "6034cd5f0e819f6cb3c11915";
  const [userResources, setUserResources] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/resources/${userId}`)
      .then((res) => {
        setUserResources(res.data.resources);
        console.log(res.data.resources);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="references-container ">
      {userResources.map(
        (resource) =>
          !resource.deleted && (
            <UpdateResource id={resource._id} data={resource} author={true} />
          )
      )}
    </div>
  );
}
