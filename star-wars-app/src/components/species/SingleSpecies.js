import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";

function SingleSpecies() {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [isLoadingSpecies, speciesInfo, speciesError] = useSpecificResult(
    `https://swapi.dev/api/species/${id}`
  );

  const [isLoadingFilms, filmsInfo, filmsError] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  const [isLoadingCharacters, charactersInfo, charactersError] = useAllResults(
    "https://swapi.dev/api/people/"
  );

  useEffect(() => {
    if (
      !isLoadingSpecies &&
      !isLoadingFilms &&
      !isLoadingCharacters &&
      speciesInfo.length !== 0 &&
      filmsInfo.length !== 0 &&
      charactersInfo.length !== 0
    ) {
      filmsInfo.map((film) => {
        if (speciesInfo.films.includes(film.url)) {
          setFilms((prevArr) => [...prevArr, film]);
        }
      });
      charactersInfo.map((character) => {
        if (speciesInfo.people.includes(character.url)) {
          setCharacters((prevArr) => [...prevArr, character]);
        }
      });
    }
  }, [isLoadingSpecies, isLoadingFilms, isLoadingCharacters]);

  return (
    <div>
      {films.length === 0 ? (
        "loading..."
      ) : (
        <div>
          <p>name: {speciesInfo.name}</p>
          <p>films</p>
          {films.map((film) => (
            <p key={film.title}>
              <Link to={`/film/${film.id}`}>{film.title}</Link>
            </p>
          ))}
          <p>citizens</p>
          {characters.map((character) => (
            <p key={character.name}>
              <Link to={`/character/${character.id}`}>{character.name}</Link>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SingleSpecies;
