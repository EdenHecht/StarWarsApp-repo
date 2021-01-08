import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";
import upsideDownTriangle from "../../utils/resources/upside-down-triangle.svg";
import "./singleStarship.css";
import Loader from "../common-styles/Loader";

function SingleStarship(props) {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isAllReady, setIsAllReady] = useState(false);
  const { charactersMap, filmsMap, isReady } = props;

  const [isLoadingStarship, starshipInfo, starshipError] = useSpecificResult(
    `https://swapi.dev/api/starships/${id}`
  );

  useEffect(() => {
    if (
      !isLoadingStarship &&
      Object.keys(starshipInfo).length !== 0 &&
      isReady
    ) {
      Object.values(filmsMap).map((film) => {
        if (starshipInfo.films.includes(film.url)) {
          setFilms((prevArr) => [...prevArr, film]);
        }
      });
      Object.values(charactersMap).map((character) => {
        if (starshipInfo.pilots.includes(character.url)) {
          setCharacters((prevArr) => [...prevArr, character]);
        }
      });
      setIsAllReady(true);
    }
  }, [isLoadingStarship, isReady]);

  return (
    <div>
      {!isAllReady ? (
        <Loader />
      ) : (
        <>
          <div className="starship-container">
            <div className="starship-name">
              <div>{starshipInfo.name}</div>
            </div>
            <div className="flex-lines">
              <div className="back-lines left"></div>
              <div className="back-lines right"></div>
            </div>
            <div className="main-details">
              <img src={upsideDownTriangle} alt="" />
              <div className="detail">
                <p>
                  Cost <strong>{starshipInfo.cost_in_credits}</strong> credits
                </p>
                <p>
                  <strong>{starshipInfo.hyperdrive_rating}</strong> hyperdrive
                  rating
                </p>
                <p>
                  <strong>{starshipInfo.max_atmosphering_speed}</strong>{" "}
                  Atmosphere speed
                </p>
                <p>
                  <strong>{starshipInfo.crew}</strong> crew members
                </p>
                <p>
                  <strong>{starshipInfo.passengers}</strong> passengers
                </p>
                <p>
                  <strong>{starshipInfo.cargo_capacity}</strong> cargo capacity
                </p>
              </div>
            </div>

            <div className="starship-columns">
              <span className="col first-col">
                <p className="column-header">Films</p>
                {films.length !== 0 ? (
                  films.map((film) => (
                    <p key={`starship-page-${starshipInfo.id}-film-${film.id}`}>
                      <Link to={`/film/${film.id}`} className="link">
                        {film.title}
                      </Link>
                    </p>
                  ))
                ) : (
                  <p>No records</p>
                )}
              </span>

              <span className="col">
                <p className="column-header">Pilots</p>
                {characters.length !== 0 ? (
                  characters.map((character) => (
                    <p
                      key={`starship-page-${starshipInfo.id}-character-${character.id}`}
                    >
                      <Link to={`/character/${character.id}`} className="link">
                        {character.name}
                      </Link>
                    </p>
                  ))
                ) : (
                  <p>No records</p>
                )}
              </span>
              <div className="faded-triangles"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleStarship;
