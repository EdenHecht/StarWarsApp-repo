import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";

function SinglePlanet() {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [isLoadingPlanet, planetInfo, planetError] = useSpecificResult(
    `https://swapi.dev/api/planets/${id}`
  );

  const [isLoadingFilms, filmsInfo, filmsError] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  const [isLoadingCharacters, charactersInfo, charactersError] = useAllResults(
    "https://swapi.dev/api/people/"
  );

  useEffect(() => {
    if (
      !isLoadingPlanet &&
      !isLoadingFilms &&
      !isLoadingCharacters &&
      planetInfo.length !== 0 &&
      filmsInfo.length !== 0 &&
      charactersInfo.length !== 0
    ) {
      filmsInfo.map((film) => {
        if (planetInfo.films.includes(film.url)) {
          setFilms((prevArr) => [...prevArr, film]);
        }
      });
      charactersInfo.map((character) => {
        if (planetInfo.residents.includes(character.url)) {
          setCharacters((prevArr) => [...prevArr, character]);
        }
      });
    }
  }, [isLoadingPlanet, isLoadingFilms, isLoadingCharacters]);

  return (
    <div>
      {films.length === 0 ? (
        "loading..."
      ) : (
        <div>
          <p>name: {planetInfo.name}</p>
          <p>population: {planetInfo.population}</p>
          <p>rotation_period: {planetInfo.rotation_period}</p>
          <p>orbital_period: {planetInfo.orbital_period}</p>
          <p>diameter: {planetInfo.diameter}</p>
          <p>climate: {planetInfo.climate}</p>
          <p>diameter: {planetInfo.diameter}</p>

          {films.length !== 0 ? (
            <span>
              <p>films</p>
              {films.map((film) => (
                <p key={film.title}>
                  <Link to={`/film/${film.id}`}>{film.title}</Link>
                </p>
              ))}
            </span>
          ) : null}

          {characters.length !== 0 ? (
            <span>
              <p>residents</p>
              {characters.map((character) => (
                <p key={character.name}>
                  <Link to={`/character/${character.id}`}>
                    {character.name}
                  </Link>
                </p>
              ))}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SinglePlanet;
