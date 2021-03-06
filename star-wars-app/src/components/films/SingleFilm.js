import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSpecificResult } from "../../hooks/hooks";
import "./SingleFilm.css";
import Loader from "../common-styles/Loader";

function SingleFilm(props) {
  const { id } = useParams();
  const { charactersMap, filmsMap, planetsMap, starshipsMap, isReady } = props;
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [starships, setStarships] = useState([]);
  const [isAllReady, setIsAllReady] = useState(false);

  const [isLoadingFilm, filmInfo, filmError] = useSpecificResult(
    `https://swapi.dev/api/films/${id}`
  );

  useEffect(() => {
    if (!isLoadingFilm && Object.keys(filmInfo).length !== 0 && isReady) {
      Object.values(charactersMap).map((character) => {
        if (filmInfo.characters.includes(character.url)) {
          setCharacters((prevArr) => [...prevArr, character]);
        }
      });
      Object.values(starshipsMap).map((starship) => {
        if (filmInfo.starships.includes(starship.url)) {
          setStarships((prevArr) => [...prevArr, starship]);
        }
      });
      Object.values(planetsMap).map((planet) => {
        if (filmInfo.planets.includes(planet.url)) {
          setPlanets((prevArr) => [...prevArr, planet]);
        }
      });
      setIsAllReady(true);
    }
  }, [isLoadingFilm, isReady]);

  return (
    <div>
      {!isAllReady ? (
        <Loader />
      ) : (
        <div className="content-info">
          <div className="poster-container">
            <div className="image-circle single-circ">
              <div id="img-design">
                <img
                  className="image-img single-img"
                  src={filmsMap[filmInfo.id].imagePath}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="film-container">
            <div className="left-info-col">
              <h1 className="film-name-header">{filmInfo.title}</h1>
              <div className="ep-dir-row">
                <div className="extra-r-padd">
                  Episode: {filmInfo.episode_id}
                </div>
                <div>Director: {filmInfo.director}</div>
              </div>
              <div>Release Date: {filmInfo.release_date}</div>
            </div>
            <div className="information-card right-info-col">
              <div className="circles"></div>

              {characters.length !== 0 ? (
                <span className="info-col">
                  <p className="info-header">characters</p>
                  {characters.map((character) => (
                    <p key={character.name + "FilmNum" + id}>
                      <Link to={`/character/${character.id}`} className="link">
                        {character.name}
                      </Link>
                    </p>
                  ))}
                </span>
              ) : null}

              {planets.length !== 0 ? (
                <span className="info-col">
                  <p className="info-header">planets</p>
                  {planets.map((planet) => (
                    <p key={planet.name + "FilmNum" + id}>
                      <Link to={`/planet/${planet.id}`} className="link">
                        {planet.name}
                      </Link>
                    </p>
                  ))}
                </span>
              ) : null}

              {starships.length !== 0 ? (
                <span className="info-col">
                  <p className="info-header">starships</p>
                  {starships.map((starship) => (
                    <p key={starship.name + "FilmNum" + id}>
                      <Link to={`/starship/${starship.id}`} className="link">
                        {starship.name}
                      </Link>
                    </p>
                  ))}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleFilm;
