import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";
import "./singleStarship.css";
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
        "loading..."
      ) : (
        <>
          <div className="starship-name">
            <div>{starshipInfo.name}</div>
          </div>
          <div className="starship-container">
            <div className="main-details">
              <div className="left-triangle"></div>
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
              <div className="right-triangle"></div>
            </div>

            <div className="starship-columns">
              <span>
                <p className="column-header">Films</p>
                {films.length !== 0 ? (
                  films.map((film) => (
                    <p key={film.title + starshipInfo.name}>
                      <Link to={`/film/${film.id}`} className="link">
                        {film.title}
                      </Link>
                    </p>
                  ))
                ) : (
                  <p>No records</p>
                )}
              </span>

              <span>
                <p className="column-header">Pilots</p>
                {characters.length !== 0 ? (
                  characters.map((character) => (
                    <p key={character.name}>
                      <Link to={`/character/${character.id}`} className="link">
                        {character.name}
                      </Link>
                    </p>
                  ))
                ) : (
                  <p>No records</p>
                )}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SingleStarship;
