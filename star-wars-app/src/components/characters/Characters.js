import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { getIdFromUrl } from "../../utils/utils";

function Characters(props) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://swapi.dev/api/people/")
      .then((res) => {
        let charactersInfo = res.data.results;
        charactersInfo = charactersInfo.map((character) => {
          const id = getIdFromUrl(character.url);
          Object.assign(character, { id: id });
          return character;
        });
        setCharacters(charactersInfo);
        setIsLoading(false);
      })
      .catch((err) => console.log("error!: ", err));
  }, []);

  return (
    <div>
      <h1>star wars</h1>
      {isLoading
        ? "loading..."
        : characters.map((character, index) => (
            <p key={character.id}>
              <Link to={`/character/${character.id}`}>{character.name}</Link>
            </p>
          ))}
    </div>
  );
}

export default Characters;
