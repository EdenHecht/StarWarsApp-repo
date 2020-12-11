import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAllResults } from "../../hooks/hooks";

function Films(props) {
  const [isLoading, info, error] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  return (
    <div>
      <h1>star wars</h1>
      {isLoading && info.length === 0
        ? "loading..."
        : info.map((film, index) => (
            <p key={film.id}>
              <Link to={`/film/${film.id}`}>{film.title}</Link>
            </p>
          ))}
      {error !== undefined ? <p>{error}</p> : null}
    </div>
  );
}

export default Films;
