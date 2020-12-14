import { Link } from "react-router-dom";
import React from "react";
import { useAllResults } from "../../hooks/hooks";
import "./films.css";

function Films(props) {
  const [isLoading, info, error] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  return (
    <div>
      {isLoading && info.length === 0 ? (
        "loading..."
      ) : (
        <div className="mb">
          <h1>
            <span>Explore</span> The Films
          </h1>
          <div className="card-holder">
            {info.map((film, index) => (
              <div className="film-card" key={film.title + "-films"}>
                <div className="poster-circle"></div>
                <p>
                  <Link to={`/film/${film.id}`}>{film.title}</Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {error !== undefined ? <p>{error}</p> : null}
    </div>
  );
}

export default Films;
