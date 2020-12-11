import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";

function SingleCharacter(props) {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const [isLoadingCharacter, characterInfo, characterError] = useSpecificResult(
    `https://swapi.dev/api/people/${id}`
  );

  const [isLoadingFilms, filmsInfo, filmsError] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  const [isLoadingStarships, starshipsInfo, starshipsError] = useAllResults(
    "https://swapi.dev/api/starships/"
  );

  useEffect(() => {
    if (
      !isLoadingCharacter &&
      !isLoadingFilms &&
      !isLoadingStarships &&
      characterInfo.length !== 0 &&
      filmsInfo.length !== 0 &&
      starshipsInfo.length !== 0
    ) {
      filmsInfo.map((film) => {
        if (characterInfo.films.includes(film.url)) {
          setFilms((prevArr) => [...prevArr, film]);
        }
      });

      starshipsInfo.map((starship) => {
        if (characterInfo.starships.includes(starship.url)) {
          setStarships((prevArr) => [...prevArr, starship]);
        }
      });
      setIsReady(true);
    }
  }, [isLoadingCharacter, isLoadingFilms, isLoadingStarships]);

  return (
    <div>
      {!isReady ? (
        "loading..."
      ) : (
        <div>
          <p>name: {characterInfo.name}</p>
          <p>height: {characterInfo.height}</p>
          <p>mass: {characterInfo.mass}</p>
          <p>gender: {characterInfo.gender}</p>
          <p>name: {characterInfo.name}</p>

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

          {starships.length !== 0 ? (
            <span>
              <p>starships</p>
              {starships.map((starship) => (
                <p key={starship.name}>
                  <Link to={`/film/${starship.id}`}>{starship.name}</Link>
                </p>
              ))}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SingleCharacter;
