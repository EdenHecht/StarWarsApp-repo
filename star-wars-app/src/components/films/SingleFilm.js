import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSpecificResult, useAllResults } from "../../hooks/hooks";

function SingleFilm(props) {
  const { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const [isLoadingFilm, filmInfo, fileError] = useSpecificResult(
    `https://swapi.dev/api/films/${id}`
  );

  const [isLoadingCharacters, charactersInfo, charactersError] = useAllResults(
    "https://swapi.dev/api/people/"
  );

  const [isLoadingPlanets, planetInfo, planetError] = useAllResults(
    "https://swapi.dev/api/planets/"
  );

  const [isLoadingStarships, starshipInfo, starshipError] = useAllResults(
    "https://swapi.dev/api/starships/"
  );

  useEffect(() => {
    if (
      !isLoadingFilm &&
      !isLoadingStarships &&
      !isLoadingCharacters &&
      !isLoadingPlanets &&
      starshipInfo.length !== 0 &&
      filmInfo.length !== 0 &&
      charactersInfo.length !== 0 &&
      planetInfo.length !== 0
    ) {
      charactersInfo.map((character) => {
        if (filmInfo.characters.includes(character.url)) {
          setCharacters((prevArr) => [...prevArr, character]);
        }
      });
      starshipInfo.map((starship) => {
        if (filmInfo.starships.includes(starship.url)) {
          setStarships((prevArr) => [...prevArr, starship]);
        }
      });
      planetInfo.map((planet) => {
        if (filmInfo.planets.includes(planet.url)) {
          setPlanets((prevArr) => [...prevArr, planet]);
        }
      });
      setIsReady(true);
    }
  }, [
    isLoadingStarships,
    isLoadingFilm,
    isLoadingCharacters,
    isLoadingPlanets,
  ]);

  return (
    <div>
      {!isReady ? (
        "loading..."
      ) : (
        <div>
          <p>name: {filmInfo.title}</p>
          <p>episode: {filmInfo.episode_id}</p>
          <p>director: {filmInfo.director}</p>
          <p>producer: {filmInfo.producer}</p>
          <p>release date: {filmInfo.release_date}</p>

          {characters.length !== 0 ? (
            <span>
              <p>characters</p>
              {characters.map((character) => (
                <p key={character.name}>
                  <Link to={`/character/${character.id}`}>
                    {character.name}
                  </Link>
                </p>
              ))}
            </span>
          ) : null}

          {planets.length !== 0 ? (
            <span>
              <p>planets</p>
              {planets.map((planet) => (
                <p key={planet.name}>
                  <Link to={`/planet/${planet.id}`}>{planet.name}</Link>
                </p>
              ))}
            </span>
          ) : null}

          {starships.length !== 0 ? (
            <span>
              <p>starships</p>
              {starships.map((starship) => (
                <p key={starship.name}>
                  <Link to={`/starship/${starship.id}`}>{starship.name}</Link>
                </p>
              ))}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SingleFilm;
