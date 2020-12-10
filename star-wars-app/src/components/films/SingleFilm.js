import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult } from "../../hooks/hooks";

function SingleFilm(props) {
  const { id } = useParams();

  const [isLoading, info, error] = useSpecificResult(
    `https://swapi.dev/api/films/${id}`
  );

  return (
    <div>
      {isLoading && info.length === 0 ? (
        "loading..."
      ) : (
        <p>name: {info.title}</p>
      )}
      {error !== undefined ? <p>{error}</p> : null}
    </div>
  );
}

export default SingleFilm;

// const [info, setInfo] = useState([]);
// const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//   setIsLoading(true);
//   axios
//     .get(`https://swapi.dev/api/films/${id}`)
//     .then((res) => {
//       setInfo(res.data);
//       setIsLoading(false);
//     })
//     .catch((err) => console.log("error!: ", err));
// }, [id]);
