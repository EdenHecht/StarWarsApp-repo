import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { getIdFromUrl } from "../../utils/utils";

function Films(props) {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://swapi.dev/api/films/")
      .then((res) => {
        let filmsInfo = res.data.results;
        filmsInfo = filmsInfo.map((film) => {
          const id = getIdFromUrl(film.url);
          Object.assign(film, { id: id });
          return film;
        });
        setFilms(filmsInfo);
        setIsLoading(false);
      })
      .catch((err) => console.log("error!: ", err));
  }, []);

  return (
    <div>
      <h1>star wars</h1>
      {isLoading && films.length === 0
        ? "loading..."
        : films.map((film, index) => (
            <p key={film.id}>
              <Link to={`/film/${film.id}`}>{film.title}</Link>
            </p>
          ))}
    </div>
  );
}

export default Films;
