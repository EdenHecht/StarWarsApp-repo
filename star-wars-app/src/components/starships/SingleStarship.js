import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";

function SingleStarship() {
  const { id } = useParams();
  const [films, setFilms] = useState([]);

  const [isLoadingStarship, starshipInfo, starshipError] = useSpecificResult(
    `https://swapi.dev/api/starships/${id}`
  );

  const [isLoadingFilms, filmsInfo, filmsError] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  useEffect(() => {
    if (
      !isLoadingStarship &&
      !isLoadingFilms &&
      starshipInfo.length !== 0 &&
      filmsInfo.length !== 0
    ) {
      filmsInfo.map((film) => {
        if (starshipInfo.films.includes(film.url)) {
          setFilms((prevArr) => [...prevArr, film]);
        }
      });
    }
  }, [isLoadingStarship, isLoadingFilms]);

  return (
    <div>
      {films.length === 0 ? (
        "loading..."
      ) : (
        <div>
          <p>name: {starshipInfo.name}</p>
          {films.map((film) => (
            <p key={film.title}>
              <Link to={`/film/${film.id}`}>{film.title}</Link>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SingleStarship;
