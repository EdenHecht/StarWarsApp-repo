import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getIdFromUrl } from "../../utils/utils";

function SingleCharacter(props) {
  const { id } = useParams();
  const [info, setInfo] = useState([]);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://swapi.dev/api/people/${id}`)
      .then((res) => {
        setInfo(res.data);
        res.data.films.map((filmUrl) => {
          axios
            .get(filmUrl)
            .then((filmRes) => {
              const id = getIdFromUrl(filmUrl);
              Object.assign(filmRes.data, { id: id });
              setFilms((oldval) => [...oldval, filmRes.data]);
            })
            .catch((err) => console.log("error!: ", err));
        });
        setIsLoading(false);
      })
      .catch((err) => console.log("error!: ", err));
  }, []);

  return (
    <div>
      {isLoading ? (
        "loading..."
      ) : (
        <div>
          <p>name: {info.name}</p>
          {films.map((film) => (
            <p key={film.id}>
              <Link to={`/film/${film.id}`}>{film.title}</Link>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SingleCharacter;
