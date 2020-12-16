import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleCharacter from "./components/characters/SingleCharacter";
import SingleFilm from "./components/films/SingleFilm";
import Characters from "./components/characters/Characters";
import Films from "./components/films/Films";
import Starships from "./components/starships/Starships";
import SingleStarship from "./components/starships/SingleStarship";
import Species from "./components/species/Species";
import SingleSpecies from "./components/species/SingleSpecies";
import Planets from "./components/planets/Planets";
import SinglePlanet from "./components/planets/SinglePlanet";
import Nav from "./components/Nav";
import { useAllResults } from "./hooks/hooks";

export default function App() {
  const [characters, setCharacters] = useState({});
  const [films, setFilms] = useState({});
  const [planets, setPlanets] = useState({});
  const [starships, setStarships] = useState({});
  const [isReady, setIsReady] = useState(false);

  const [isLoadingFilms, filmsInfo, filmsError] = useAllResults(
    "https://swapi.dev/api/films/"
  );

  const [isLoadingCharacters, charactersInfo, charactersError] = useAllResults(
    "https://swapi.dev/api/people/"
  );

  const [isLoadingPlanets, planetsInfo, planetError] = useAllResults(
    "https://swapi.dev/api/planets/"
  );

  const [isLoadingStarships, starshipsInfo, starshipError] = useAllResults(
    "https://swapi.dev/api/starships/"
  );

  useEffect(() => {
    if (!isLoadingFilms && filmsInfo.length !== 0) {
      filmsInfo.map((film) =>
        setFilms((prevVal) => {
          let newDict = { ...prevVal };
          newDict[film.id] = {
            title: film.title,
            url: film.url,
            imagePath: "",
          };
          return newDict;
        })
      );
      console.log(films);
      if (
        !isReady &&
        characters.length !== 0 &&
        planets.length !== 0 &&
        starships.length !== 0
      ) {
        setIsReady(true);
      }
    }
  }, [isLoadingFilms, filmsInfo]);

  useEffect(() => {
    if (!isLoadingStarships && starshipsInfo.length !== 0) {
      starshipsInfo.map((starship) =>
        setStarships((prevVal) => {
          let newDict = { ...prevVal };
          newDict[starship.id] = {
            name: starship.name,
            url: starship.url,
            imagePath: "",
          };
          return newDict;
        })
      );
      console.log(starships);

      if (
        !isReady &&
        characters.length !== 0 &&
        planets.length !== 0 &&
        films.length !== 0
      ) {
        setIsReady(true);
      }
    }
  }, [isLoadingStarships, starshipsInfo]);

  useEffect(() => {
    if (!isLoadingCharacters && charactersInfo.length !== 0) {
      charactersInfo.map((character) =>
        setCharacters((prevVal) => {
          let newDict = { ...prevVal };
          newDict[character.id] = {
            name: character.name,
            url: character.url,
            imagePath: "",
          };
          return newDict;
        })
      );
      console.log(characters);

      if (
        !isReady &&
        starships.length !== 0 &&
        planets.length !== 0 &&
        films.length !== 0
      ) {
        setIsReady(true);
      }
    }
  }, [isLoadingCharacters, charactersInfo]);

  useEffect(() => {
    if (!isLoadingPlanets && planetsInfo.length !== 0) {
      planetsInfo.map((planet) =>
        setPlanets((prevVal) => {
          let newDict = { ...prevVal };
          newDict[planet.id] = {
            name: planet.name,
            url: planet.url,
            imagePath: "",
          };
          return newDict;
        })
      );
      console.log(planets);

      if (
        !isReady &&
        characters.length !== 0 &&
        planets.length !== 0 &&
        films.length !== 0
      ) {
        setIsReady(true);
      }
    }
  }, [isLoadingCharacters, planetsInfo]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/characters" exact>
            <Characters />
          </Route>
          <Route path="/films" exact>
            <Films
              filmsInfo={filmsInfo}
              charactersMap={characters}
              planetsMap={planets}
              starshipsMap={starships}
              isReady={isReady}
            />
          </Route>
          <Route path="/starships" exact>
            <Starships />
          </Route>
          <Route path="/species" exact>
            <Species />
          </Route>
          <Route path="/planets" exact>
            <Planets />
          </Route>
          <Route path={`/character/:id`} exact>
            <SingleCharacter />
          </Route>
          <Route path={`/film/:id`} exact>
            <SingleFilm />
          </Route>
          <Route path={`/starship/:id`} exact>
            <SingleStarship />
          </Route>
          <Route path={`/species/:id`} exact>
            <SingleSpecies />
          </Route>
          <Route path={`/planets/:id`} exact>
            <SinglePlanet />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
