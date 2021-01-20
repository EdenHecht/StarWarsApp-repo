import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./films.css";
import "../common-styles/Cards.css";
import arrow from "../../utils/resources/down-arrow.svg";
import { showFirstResults } from "../../utils/utils";
import Loader from "../common-styles/Loader";

function Films(props) {
  const [expanded, setExpanded] = useState(-1);
  const {
    filmsInfo,
    filmsMap,
    charactersMap,
    planetsMap,
    starshipsMap,
    isReady,
  } = props;

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
        <Loader />
      ) : (
        <div className="films-page mb">
          <h1 className="cards-header">
            <span id="text-Design">Explore</span> The Films
          </h1>
          <div className="card-holder">
            {filmsInfo.map((film, index) => (
              <div key={`films-page-${film.id}`} className="card">
                <div
                  className={
                    expanded === index
                      ? "single-card single-card-expanded"
                      : "single-card film-page"
                  }
                  key={film.title + "-films"}
                >
                  <div className="image-circle">
                    <img
                      className="image-img"
                      src={filmsMap[film.id].imagePath}
                      alt=""
                    />
                  </div>
                  <div className="detail-box">
                    <div className="left-col">
                      <Link to={`/film/${film.id}`} className="title-link">
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
                </div>
                <div
                  className={
                    expanded === index ? "expanded" : "expanded not-expanded"
                  }
                >
                  <div className="columns-container">
                    <div className="column first">
                      <strong>Characters</strong>
                      {showFirstResults(film, "characters", charactersMap).map(
                        (character) => (
                          <p
                            key={`films-page-${film.id}-character-${character.id}`}
                          >
                            <Link
                              to={`/character/${character.id}`}
                              className="expanded-links"
                            >
                              {character.name}
                            </Link>
                          </p>
                        )
                      )}
                    </div>
                    <div className="column">
                      <strong>Planets</strong>

                      {showFirstResults(film, "planets", planetsMap).map(
                        (planet) => (
                          <p key={`films-page-${film.id}-planet-${planet.id}`}>
                            <Link
                              to={`/planet/${planet.id}`}
                              className="expanded-links"
                            >
                              {planet.name}
                            </Link>
                          </p>
                        )
                      )}
                    </div>
                    <div className="column">
                      <strong>Starships</strong>
                      {showFirstResults(film, "starships", starshipsMap).map(
                        (starship) => (
                          <p
                            key={`films-page-${film.id}-starship-${starship.id}`}
                          >
                            <Link
                              to={`/starship/${starship.id}`}
                              className="expanded-links"
                            >
                              {starship.name}
                            </Link>
                          </p>
                        )
                      )}
                    </div>
                  </div>
                  <div className="read-more">
                    <Link to={`/film/${film.id}`} className="read-more-link">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Films;
