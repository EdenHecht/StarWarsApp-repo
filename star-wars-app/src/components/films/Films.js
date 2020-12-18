import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAllResults } from "../../hooks/hooks";
import "./films.css";
import poster from "../../utils/resources/posters/a new hope.jpg";
import arrow from "../../utils/resources/down-arrow.svg";
import { showFirstResults } from "../../utils/utils";

function Films(props) {
  const [expanded, setExpanded] = useState(-1);
  const { filmsInfo, charactersMap, planetsMap, starshipsMap, isReady } = props;

  function handleExpand(e, index) {
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
          <h1 className="film-header">
            <span>Explore</span> The Films
          </h1>
          <div className="card-holder">
            {filmsInfo.map((film, index) => (
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
                    onClick={(e) => handleExpand(e, index)}
                  >
                    Expand
                    <img src={arrow} alt="" className="arrow-icon" />
                  </div>
                </div>
                {expanded === index ? (
                  <div className="expanded">
                    <div className="column">
                      <strong>Characters:</strong>
                      {showFirstResults(film, "characters", charactersMap).map(
                        (character) => (
                          <p>{character.name}</p>
                        )
                      )}
                    </div>
                    <div className="column">
                      <strong>Planets:</strong>

                      {showFirstResults(film, "planets", planetsMap).map(
                        (planet) => (
                          <p>{planet.name}</p>
                        )
                      )}
                    </div>
                    <div className="column">
                      <strong>Starships:</strong>
                      {showFirstResults(film, "starships", starshipsMap).map(
                        (starship) => (
                          <p>{starship.name}</p>
                        )
                      )}
                    </div>
                    <div className="read-more">
                      <Link to={`/film/${film.id}`} className="read-more-link">
                        Read More
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Films;

//const [isReady, setIsReady] = useState(false);
// const [isLoading, info, error] = useAllResults(
//   "https://swapi.dev/api/films/"
// );

// useEffect(() => {
//   if (isLoading && info.length === 0) {
//     setIsReady(true);
//   }
// }, [isLoading, info]);
