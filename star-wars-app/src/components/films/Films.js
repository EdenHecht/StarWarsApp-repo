import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAllResults } from "../../hooks/hooks";
import "./films.css";
import poster from "../../utils/resources/posters/a new hope.jpg";
import arrow from "../../utils/resources/down-arrow.svg";

function Films(props) {
  const [isReady, setIsReady] = useState(false);
  const [expanded, setExpanded] = useState(-1);

  const [isLoading, info, error] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  useEffect(() => {
    if (isLoading && info.length === 0) {
      setIsReady(true);
    }
  }, [isLoading, info]);

  function handleExpand(index) {
    if (index === expanded) {
      setExpanded(-1);
    } else {
      setExpanded(index);
    }
  }

  return (
    <div>
      {!isReady ? (
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
                  <div
                    className="expand-btn"
                    onClick={(e) => handleExpand(index)}
                  >
                    Expand
                    <img src={arrow} alt="" className="arrow-icon" />
                  </div>
                </div>
                {expanded === index ? <div className="expanded">hi</div> : null}
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
