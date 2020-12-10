import React from "react";
import { Link } from "react-router-dom";
import { useAllResults } from "../../hooks/hooks";

function Starships() {
  const [isLoading, info, error] = useAllResults(
    "https://swapi.dev/api/starships/"
  );

  return (
    <div>
      <h1>star wars</h1>
      {isLoading && info.length === 0
        ? "loading..."
        : info.map((starship) => (
            <p key={starship.name}>
              <Link to={`/starship/${starship.id}`}>{starship.name}</Link>
            </p>
          ))}
      {error !== undefined ? <p>{error}</p> : null}
    </div>
  );
}

export default Starships;
