import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";

function SingleCharacter(props) {
  const { id } = useParams();
  const [films, setFilms] = useState([]);

  const [isLoadingCharacter, characterInfo, characterError] = useSpecificResult(
    `https://swapi.dev/api/people/${id}`
  );

  const [isLoadingFilms, filmsInfo, filmsError] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  useEffect(() => {
    if (
      !isLoadingCharacter &&
      !isLoadingFilms &&
      characterInfo.length !== 0 &&
      filmsInfo.length !== 0
    ) {
      filmsInfo.map((film) => {
        if (characterInfo.films.includes(film.url)) {
          setFilms((prevArr) => [...prevArr, film]);
        }
      });
    }
  }, [isLoadingCharacter, isLoadingFilms]);

  return (
    <div>
      {films.length === 0 ? (
        "loading..."
      ) : (
        <div>
          <p>name: {characterInfo.name}</p>
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

export default SingleCharacter;

// const [info, setInfo] = useState([]);
// const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//   setIsLoading(true);
//   axios
//     .get(`https://swapi.dev/api/people/${id}`)
//     .then((res) => {
//       setInfo(res.data);
//       res.data.films.map((filmUrl) => {
//         axios
//           .get(filmUrl)
//           .then((filmRes) => {
//             const id = getIdFromUrl(filmUrl);
//             Object.assign(filmRes.data, { id: id });
//             setFilms((oldval) => [...oldval, filmRes.data]);
//           })
//           .catch((err) => console.log("error!: ", err));
//       });
//       setIsLoading(false);
//     })
//     .catch((err) => console.log("error!: ", err));
// }, []);
