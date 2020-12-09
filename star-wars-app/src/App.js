import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SingleCharacter from "./components/characters/SingleCharacter";
import SingleFilm from "./components/films/SingleFilm";

import Characters from "./components/characters/Characters";
import Films from "./components/films/Films";

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
          <Route path={`/character/:id`} exact>
            <SingleCharacter />
          </Route>
          <Route path={`/film/:id`} exact>
            <SingleFilm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
