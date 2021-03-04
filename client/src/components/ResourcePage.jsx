import React, { useState, useEffect } from "react";
import axios from "axios";
import Resource from "./Resource/Resource";
const ResourcePage = (match) => {
  const [resource, setResource] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/resources/${match.params.resourceId}`)
      /* .get("http://localhost:5000/resources/604084b7583dd96c92ce3667")  */
      .then((res) => {
        console.log(res);
        setResource(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Resource data={resource} />
    </div>
  );
};

export default ResourcePage;
