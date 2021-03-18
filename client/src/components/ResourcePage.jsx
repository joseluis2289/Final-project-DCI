import React, { useState, useEffect } from "react";
import axios from "axios";
import Resource from "./Resource/Resource";

export default function ResourcePage() {
  const [resource, setResource] = useState({
    category: ["backend", "frontend"],
    usersThatRated: [],
    edited: false,
    reported: false,
    comments: [],
    rankingUser: [null, "undefined"],
    _id: "605131b18b7a03a9a6e50288",
    title: "JWT Authentication Tutorial - Node.js",
    link:
      "https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified",
    previewImage: "https://git-scm.com/images/logo@2x.png",
    date: "2021-03-16T22:31:13.514Z",
    user: {
      _id: "60408472458f926b21f21c21",
      name: "Renata",
    },
    rating: 5,
    num_ratings: 3,
    num_views: 1589253,
    paid: false,
    description:
      "How to generate 64bit secret key in the terminal and other useful things in this video",
    __v: 2,
  });
  const [loading, setLoading] = useState(true);

  useEffect(async (e) => {
    e.preventDefault();
    let url = window.location.href.split("/");
    const resourceId = url[url.length - 1];
    axios
      .get(`/resources/resource/${resourceId}`)
      .then((res) => {
        setResource(res.data);
        console.log(res.data);
      })
      .then(() => {
        /* setLoading(false); */
        console.log("esperou?");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {/* {!loading && ( */}
      <Resource
        data={resource}
        image={
          "https://www.freecodecamp.org/news/content/images/2020/04/screely-1586183781361.png"
        }
      />
      {/* )} */}
    </div>
  );
}
