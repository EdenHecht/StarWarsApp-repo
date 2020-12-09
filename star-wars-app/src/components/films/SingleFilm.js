import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function SingleFilm(props) {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://swapi.dev/api/films/${id}`)
      .then((res) => {
        setInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log("error!: ", err));
  }, [id]);

  return <div>{isLoading ? "loading..." : <p>name: {info.title}</p>}</div>;
}

export default SingleFilm;
