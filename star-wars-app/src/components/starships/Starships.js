import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAllResults } from "../../hooks/hooks";
import "../common-styles/Cards.css";
import "./starships.css";

function Starships(props) {
  // const [isLoading, info, error] = useAllResults(
  //   "https://swapi.dev/api/starships/"
  // );

  const [expanded, setExpanded] = useState(-1);

  const {
    starshipsInfo,
    charactersMap,
    filmsMap,
    starshipsMap,
    isReady,
  } = props;

  const bg = ["#606679", "#6B6079", "#796069"];

  return (
    <div>
      {!isReady ? (
        "loading..."
      ) : (
        <div className="starships-page">
          <h1 className="cards-header starships-header">
            <span id="text-Design-starships">Explore The Starships</span>
          </h1>
          <div className="card-holder">
            {starshipsInfo.map((starship, index) => (
              <div className="card starship-card">
                <div className="single-card">
                  <div
                    className="starship-name-circle"
                    style={{ background: bg[index % bg.length] }}
                  >
                    {starship.name}
                  </div>
                  <div className="starship-details">
                    <p>
                      Costs{" "}
                      <span className="bold-detail">
                        {starship.cost_in_credits}
                      </span>{" "}
                      credits
                    </p>
                    <p>
                      <span className="bold-detail">
                        {starship.hyperdrive_rating}
                      </span>{" "}
                      hyperdrive rading
                    </p>
                    <p>
                      <span className="bold-detail">
                        {starship.max_atmosphering_speed}
                      </span>{" "}
                      atmosphere speed
                    </p>
                  </div>
                </div>
                <div className="starship-read-more-btn">
                  <Link
                    to={`/starship/${starship.id}`}
                    className="starship-link"
                  >
                    Keep Reading
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Starships;
