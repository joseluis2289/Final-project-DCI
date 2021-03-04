import React, { useState, useEffect } from "react";
import axios from "axios";
import Resource from "./Resource/Resource";

export default function ResourcePage() {
  const [resource, setResource] = useState({});
  useEffect(() => {
    let url = window.location.href.split("/");
    const resourceId = url[url.length - 1];
    console.log(resourceId);
    axios
      .get(`http://localhost:5000/resources/resource/${resourceId}`)
      .then(async (res) => {
        await setResource(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Resource data={resource} />
    </div>
  );
}
