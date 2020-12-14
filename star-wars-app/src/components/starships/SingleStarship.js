import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";

function SingleStarship() {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const [isLoadingStarship, starshipInfo, starshipError] = useSpecificResult(
    `https://swapi.dev/api/starships/${id}`
  );

  const [isLoadingFilms, filmsInfo, filmsError] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  const [isLoadingCharacters, charactersInfo, charactersError] = useAllResults(
    "https://swapi.dev/api/people/"
  );

  useEffect(() => {
    if (
      !isLoadingStarship &&
      !isLoadingFilms &&
      !isLoadingCharacters &&
      starshipInfo.length !== 0 &&
      filmsInfo.length !== 0 &&
      charactersInfo.length !== 0
    ) {
      filmsInfo.map((film) => {
        if (starshipInfo.films.includes(film.url)) {
          setFilms((prevArr) => [...prevArr, film]);
        }
      });
      charactersInfo.map((character) => {
        if (starshipInfo.pilots.includes(character.url)) {
          setCharacters((prevArr) => [...prevArr, character]);
        }
      });
      setIsReady(true);
    }
  }, [isLoadingStarship, isLoadingFilms, isLoadingCharacters]);

  return (
    <div>
      {!isReady ? (
        "loading..."
      ) : (
        <div>
          <p>name: {starshipInfo.name}</p>
          <p>cost in credits: {starshipInfo.cost_in_credits}</p>
          <p>max atmosphering speed: {starshipInfo.max_atmosphering_speed}</p>
          <p>crew: {starshipInfo.crew}</p>
          <p>passengers: {starshipInfo.passengers}</p>
          <p>hyperdrive rating: {starshipInfo.hyperdrive_rating}</p>

          {films.length !== 0 ? (
            <span>
              <p>films</p>
              {films.map((film) => (
                <p key={film.title + starshipInfo.name}>
                  <Link to={`/film/${film.id}`}>{film.title}</Link>
                </p>
              ))}
            </span>
          ) : null}

          {characters.length !== 0 ? (
            <span>
              <p>pilots</p>
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

export default SingleStarship;
