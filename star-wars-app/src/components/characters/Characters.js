import { Link } from "react-router-dom";
import React, { useState } from "react";
import arrow from "../../utils/resources/down-arrow.svg";
import "../common-styles/Cards.css";
import "./Characters.css";

import { getIdFromUrl } from "../../utils/utils";

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
        "loading..."
      ) : (
        <div className="mb">
          <h1 className="cards-header character-header">
            <span id="text-Design">Explore</span> The Characters
          </h1>
          <div className="card-holder">
            {charactersInfo.map((character, index) => (
              <div className="card character-card">
                <div className="card-bg">
                  <svg
                    width="198"
                    height="148"
                    viewBox="0 0 198 148"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M198 0C192.587 66.0601 156.338 82.98 143.33 148H21V0H198Z"
                      fill={bg[index % bg.length]}
                    />
                    <path
                      d="M0 13C0 5.82031 5.8203 0 13 0H31V147.59H13C5.8203 147.59 0 141.77 0 134.59V13Z"
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
                        Home:
                        {planetsMap[getIdFromUrl(character.homeworld)].name}
                      </div>
                      <div className="margin-b right-item">
                        Birth Year: {character.birth_year}
                      </div>
                      <div className="margin-b right-item">
                        Height: {character.height}
                      </div>
                      <div className="right-item">mass: {character.mass}</div>
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
                {/* <div
                  className={
                    expanded === index ? "expanded" : "expanded not-expanded"
                  }
                >
                  <div className="columns-container">
                    <div className="column first">
                      <strong>Characters</strong>
                      {showFirstResults(film, "characters", charactersMap).map(
                        (character) => (
                          <p>{character.name}</p>
                        )
                      )}
                    </div>
                    <div className="column">
                      <strong>Planets</strong>

                      {showFirstResults(film, "planets", planetsMap).map(
                        (planet) => (
                          <p>{planet.name}</p>
                        )
                      )}
                    </div>
                    <div className="column">
                      <strong>Starships</strong>
                      {showFirstResults(film, "starships", starshipsMap).map(
                        (starship) => (
                          <p>{starship.name}</p>
                        )
                      )}
                    </div>
                  </div>
                  <div className="read-more">
                    <Link to={`/film/${film.id}`} className="read-more-link">
                      Read More
                    </Link>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Characters;

// const [characters, setCharacters] = useState([]);
// const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//   setIsLoading(true);
//   axios
//     .get("https://swapi.dev/api/people/")
//     .then((res) => {
//       let charactersInfo = res.data.results;
//       charactersInfo = charactersInfo.map((character) => {
//         const id = getIdFromUrl(character.url);
//         Object.assign(character, { id: id });
//         return character;
//       });
//       setCharacters(charactersInfo);
//       setIsLoading(false);
//     })
//     .catch((err) => console.log("error!: ", err));
// }, []);

// info.map((character) => (
//   <p key={character.id}>
//     <Link to={`/character/${character.id}`}>{character.name}</Link>
//   </p>
// ))
