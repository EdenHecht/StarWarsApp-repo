import React from "react";
import { Link } from "react-router-dom";
import { useAllResults } from "../../hooks/hooks";

function Planets() {
  const [isLoading, info, error] = useAllResults(
    "https://swapi.dev/api/planets/"
  );

  return (
    <div>
      <h1>star wars</h1>
      {isLoading && info.length === 0
        ? "loading..."
        : info.map((planet) => (
            <p key={planet.name}>
              <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
            </p>
          ))}
      {error !== undefined ? <p>{error}</p> : null}
    </div>
  );
}

export default Planets;
