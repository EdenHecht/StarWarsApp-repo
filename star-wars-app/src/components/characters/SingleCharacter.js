import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult, useAllResults } from "../../hooks/hooks";
import { getIdFromUrl } from "../../utils/utils";

import Loader from "../common-styles/Loader";
import "./SingleCharacter.css";

function SingleCharacter(props) {
  const { id } = useParams();
  const [films, setFilms] = useState([]);
  const [starships, setStarships] = useState([]);
  const [isAllReady, setIsAllReady] = useState(false);
  const { planetsMap, starshipsMap, charactersMap, filmsMap, isReady } = props;

  const [isLoadingCharacter, characterInfo, characterError] = useSpecificResult(
    `https://swapi.dev/api/people/${id}`
  );

  useEffect(() => {
    if (
      !isLoadingCharacter &&
      Object.keys(characterInfo).length !== 0 &&
      isReady
    ) {
      Object.values(filmsMap).map((film) => {
        if (characterInfo.films.includes(film.url)) {
          setFilms((prevArr) => [...prevArr, film]);
        }
        return;
      });

      Object.values(starshipsMap).map((starship) => {
        if (characterInfo.starships.includes(starship.url)) {
          setStarships((prevArr) => [...prevArr, starship]);
        }
        return;
      });
      setIsAllReady(true);
    }
  }, [isLoadingCharacter, isReady]);

  return (
    <div>
      {!isAllReady ? (
        <Loader />
      ) : (
        <div className="single-character-page">
          <div className="circle-bg">
            <div className="image-circle avatar-circle">
              <img
                className="image-img avatar"
                src={charactersMap[id].imagePath}
                alt=""
              />
            </div>
            <div className="character-name">{characterInfo.name}</div>
            <div className="white-circle"></div>
            <div className="container">
              <div className="details">
                <div className="first col">
                  <p>
                    <strong>Height: </strong>
                    {characterInfo.height}
                  </p>
                  <p>
                    <strong>Mass: </strong>
                    {characterInfo.mass}
                  </p>
                  <p>
                    <strong>Gender: </strong>
                    {characterInfo.gender}
                  </p>
                </div>
                <div className="col">
                  <p>
                    <strong>Birth Year: </strong>
                    {characterInfo.birth_year}
                  </p>
                  <p>
                    <strong>Homeworld: </strong>
                    {planetsMap[getIdFromUrl(characterInfo.homeworld)].name}
                  </p>
                </div>
              </div>
              <div className="second-row">
                <div className="films">
                  <strong>Films</strong>
                  {films.map((film) => (
                    <p key={`character-${id}-film-${film.id}`}>
                      <Link to={`/film/${film.id}`} className="expanded-links">
                        {film.title}
                      </Link>
                    </p>
                  ))}
                </div>
                <div className="starships">
                  <strong>Starships</strong>
                  {characterInfo.starships.length > 0 ? (
                    starships.map((starship) => (
                      <p key={`character-${id}-starship-${starship.id}`}>
                        <Link
                          to={`/starship/${starship.id}`}
                          className="expanded-links"
                        >
                          {starship.name}
                        </Link>
                      </p>
                    ))
                  ) : (
                    <p>No starships under my command</p>
                  )}
                </div>
              </div>
            </div>
            <div className="red-circle"></div>
            <div className="yellow-circle"></div>
            <div className="green-circle"></div>
            <div className="blue-circle"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleCharacter;
