import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleCharacter from "./components/characters/SingleCharacter";
import SingleFilm from "./components/films/SingleFilm";
import Characters from "./components/characters/Characters";
import Films from "./components/films/Films";
import Starships from "./components/starships/Starships";
import SingleStarship from "./components/starships/SingleStarship";
import Species from "./components/species/Species";
import SingleSpecies from "./components/species/SingleSpecies";
import Nav from "./components/Nav";

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/characters" exact>
            <Characters />
          </Route>
          <Route path="/films" exact>
            <Films />
          </Route>
          <Route path="/starships" exact>
            <Starships />
          </Route>
          <Route path="/species" exact>
            <Species />
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
        </Switch>
      </div>
    </Router>
  );
}
