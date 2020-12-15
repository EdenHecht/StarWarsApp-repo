import { Link } from "react-router-dom";
import React from "react";
import { useAllResults } from "../../hooks/hooks";
import "./films.css";
import poster from "../../utils/resources/posters/a new hope.jpg";

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
                <div className="poster-circle">
                  <img className="poster-img" src={poster} alt="" />
                </div>
                <div className="detail-box">
                  <div className="left-col">
                    <Link to={`/film/${film.id}`} className="film-title-link">
                      {film.title}
                    </Link>
                  </div>
                  <div className="right-col">
                    <div className="margin-b right-item">
                      Episode: {film.episode_id}
                    </div>
                    <div className="margin-b right-item">
                      Director: {film.director}
                    </div>
                    <div className="right-item">
                      Release date: {film.release_date}
                    </div>
                  </div>
                </div>
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
