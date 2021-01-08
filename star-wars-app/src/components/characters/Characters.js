import { Link } from "react-router-dom";
import React, { useState } from "react";
import arrow from "../../utils/resources/down-arrow.svg";
import "../common-styles/Cards.css";
import "./Characters.css";
import { getIdFromUrl, showFirstResults } from "../../utils/utils";
import Loader from "../common-styles/Loader";

function Characters(props) {
  const [expanded, setExpanded] = useState(-1);

  const {
    charactersInfo,
    charactersMap,
    filmsMap,
    planetsMap,
    starshipsMap,
    isReady,
  } = props;

  const bg = ["#B5A389", "#89A0B5", "#9DC3A6", "#C39D9D"];

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
        <div className="mb characters-page">
          <h1 className="cards-header character-header">
            <span id="text-Design">Explore</span> The Characters
          </h1>
          <div className="card-holder characters-card-holder">
            {charactersInfo.map((character, index) => (
              <div
                key={`characters-page-${character.id}`}
                className="card character-card"
              >
                <div className="card-bg">
                  <svg
                    width="170"
                    height="118"
                    viewBox="0 0 170 118"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 13C0 5.8203 5.8203 0 13 0H30V49H0V13Z"
                      fill={bg[index % bg.length]}
                    />
                    <path
                      d="M0 78.2723V21H18V0H166.757C168.872 7.80851 170 16.0225 170 24.5C170 76.1386 128.139 118 76.5 118C44.8773 118 16.9212 102.301 0 78.2723Z"
                      fill={bg[index % bg.length]}
                    />
                  </svg>
                </div>
                <div
                  className={
                    expanded === index
                      ? "single-card single-card-expanded"
                      : "single-card"
                  }
                  key={character.name + "-characters"}
                >
                  <div className="image-circle avatar-circle">
                    <img
                      className="image-img avatar"
                      src={charactersMap[character.id].imagePath}
                      alt=""
                    />
                  </div>
                  <div className="detail-box">
                    <div className="left-col character-left-col">
                      <Link
                        to={`/character/${character.id}`}
                        className="title-link character-title-link"
                      >
                        {character.name}
                      </Link>
                      <div className="gender">
                        {character.gender !== "n/a"
                          ? character.gender
                          : "no gender"}
                      </div>
                    </div>
                    <div className="right-col">
                      <div className="margin-b right-item">
                        Raised in{" "}
                        {planetsMap[getIdFromUrl(character.homeworld)].name}
                      </div>
                      <div className="margin-b right-item">
                        Born on {character.birth_year}
                      </div>
                      <div className="margin-b right-item">
                        {character.height}cm
                      </div>
                      <div className="right-item">{character.mass}kg</div>
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
                  <div className="faded-circle"></div>
                  <div className="columns-container">
                    <div className="column first">
                      <strong>Films</strong>
                      {showFirstResults(character, "films", filmsMap).map(
                        (film) => (
                          <p key={`characters-film-${film.id}`}>
                            <Link
                              to={`/film/${film.id}`}
                              className="expanded-links"
                            >
                              {film.title}
                            </Link>
                          </p>
                        )
                      )}
                    </div>
                    <div className="column">
                      <strong>Starships</strong>
                      {character.starships.length > 0 ? (
                        showFirstResults(
                          character,
                          "starships",
                          starshipsMap
                        ).map((starship) => (
                          <p key={`characters-starship-${starship.id}`}>
                            <Link
                              to={`/starship/${starship.id}`}
                              className="expanded-links"
                            >
                              {starship.name}
                            </Link>
                          </p>
                        ))
                      ) : (
                        <p>No starships under my command</p>
                      )}
                    </div>
                  </div>
                  <div className="read-more">
                    <Link
                      to={`/character/${character.id}`}
                      className="read-more-link"
                    >
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

export default Characters;
