import React from "react";
import { Link } from "react-router-dom";
import { useAllResults } from "../../hooks/hooks";

function Species() {
  const [isLoading, info, error] = useAllResults(
    "https://swapi.dev/api/species/"
  );

  return (
    <div>
      <h1>star wars</h1>
      {isLoading && info.length === 0
        ? "loading..."
        : info.map((species) => (
            <p key={species.name}>
              <Link to={`/species/${species.id}`}>{species.name}</Link>
            </p>
          ))}
      {error !== undefined ? <p>{error}</p> : null}
    </div>
  );
}

export default Species;
