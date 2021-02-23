import React, { useEffect, useState } from "react";
import axios from "axios";
import Resource from "../Resource";

export default function MyResources() {
  const userId = "6033aa680435059a34b77d43";
  const [userResources, setUserResources] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/resources/${userId}`)
      .then((res) => {
        /* setUserResources([...res]); */
        console.log("that is the res:", res);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>My resources {userResources}</div>;
}
