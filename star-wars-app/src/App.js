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
import Home from "./components/home/Home";
import { useAllResults } from "./hooks/hooks";
import { avatarExist } from "./utils/utils";

export default function App() {
  const [characters, setCharacters] = useState({});
  const [films, setFilms] = useState({});
  const [planets, setPlanets] = useState({});
  const [starships, setStarships] = useState({});
  const [species, setSpecies] = useState({});
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

  const [isLoadingSpecies, speciesInfo, speciesError] = useAllResults(
    "https://swapi.dev/api/species/"
  );

  useEffect(() => {
    if (
      !isReady &&
      Object.keys(films).length !== 0 &&
      Object.keys(characters).length !== 0 &&
      Object.keys(planets).length !== 0 &&
      Object.keys(species).length !== 0 &&
      Object.keys(starships).length !== 0
    ) {
      console.log("planets: ", planets);
      console.log("films: ", films);
      console.log("starships: ", starships);
      console.log("characters: ", characters);
      console.log("species: ", species);

      setIsReady(true);
    }
  }, [isReady, films, characters, planets, starships, species]);

  useEffect(() => {
    if (!isLoadingFilms && filmsInfo.length !== 0) {
      filmsInfo.map((film) =>
        setFilms((prevVal) => {
          let newDict = { ...prevVal };
          newDict[film.id] = {
            id: film.id,
            title: film.title,
            url: film.url,
            imagePath: "",
          };
          return newDict;
        })
      );
    }
  }, [isLoadingFilms, filmsInfo]);

  useEffect(() => {
    if (!isLoadingStarships && starshipsInfo.length !== 0) {
      starshipsInfo.map((starship) =>
        setStarships((prevVal) => {
          let newDict = { ...prevVal };
          newDict[starship.id] = {
            id: starship.id,
            name: starship.name,
            url: starship.url,
            imagePath: "",
          };
          return newDict;
        })
      );
    }
  }, [isLoadingStarships, starshipsInfo]);

  useEffect(() => {
    if (!isLoadingCharacters && charactersInfo.length !== 0) {
      charactersInfo.map((character) =>
        setCharacters((prevVal) => {
          let newDict = { ...prevVal };
          newDict[character.id] = {
            id: character.id,
            name: character.name,
            url: character.url,
            imagePath: avatarExist(character.name)
              ? `/images/avatars/${character.name}.png`
              : "images/avatars/default.png",
          };
          return newDict;
        })
      );
    }
  }, [isLoadingCharacters, charactersInfo]);

  useEffect(() => {
    if (!isLoadingPlanets && planetsInfo.length !== 0) {
      planetsInfo.map((planet) =>
        setPlanets((prevVal) => {
          let newDict = { ...prevVal };
          newDict[planet.id] = {
            id: planet.id,
            name: planet.name,
            url: planet.url,
            imagePath: "",
          };
          return newDict;
        })
      );
    }
  }, [isLoadingPlanets, planetsInfo]);

  useEffect(() => {
    if (!isLoadingSpecies && speciesInfo.length !== 0) {
      speciesInfo.map((species) =>
        setSpecies((prevVal) => {
          let newDict = { ...prevVal };
          newDict[species.id] = {
            id: species.id,
            name: species.name,
            url: species.url,
            imagePath: "",
          };
          return newDict;
        })
      );
    }
  }, [isLoadingSpecies, speciesInfo]);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/characters" exact>
            <Nav />
            <Characters
              charactersInfo={charactersInfo}
              charactersMap={characters}
              filmsMap={films}
              planetsMap={planets}
              starshipsMap={starships}
              isReady={isReady}
            />
          </Route>
          <Route path="/films" exact>
            <Nav />
            <Films
              filmsInfo={filmsInfo}
              charactersMap={characters}
              planetsMap={planets}
              starshipsMap={starships}
              speciesMap={species}
              isReady={isReady}
            />
          </Route>
          <Route path="/starships" exact>
            <Nav />
            <Starships starshipsInfo={starshipsInfo} isReady={isReady} />
          </Route>
          {/* <Route path="/species" exact>

            <Species />
          </Route>
          <Route path="/planets" exact>
            <Planets />
          </Route> */}
          <Route path={`/character/:id`} exact>
            <Nav />
            <SingleCharacter
              charactersMap={characters}
              filmsMap={films}
              planetsMap={planets}
              starshipsMap={starships}
              isReady={isReady}
            />
          </Route>
          <Route path={`/film/:id`} exact>
            <Nav />
            <SingleFilm
              charactersMap={characters}
              planetsMap={planets}
              starshipsMap={starships}
              isReady={isReady}
            />
          </Route>
          <Route path={`/starship/:id`} exact>
            <Nav />
            <SingleStarship
              charactersMap={characters}
              filmsMap={films}
              isReady={isReady}
            />
          </Route>
          {/* <Route path={`/species/:id`} exact>
            <SingleSpecies />
          </Route>
          <Route path={`/planets/:id`} exact>
            <SinglePlanet />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}
