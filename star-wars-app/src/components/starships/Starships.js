import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAllResults } from "../../hooks/hooks";
import "../common-styles/Cards.css";
import "./starships.css";

function Starships(props) {
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
                  <div className="starship-name-triangle">
                    <svg
                      className="starship-name-svg"
                      width="150"
                      height="115"
                      viewBox="0 0 150 115"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M84.0164 113.123C82.8337 114.945 80.1663 114.945 78.9835 113.123L13.926 12.8832C12.6306 10.8873 14.0631 8.24998 16.4425 8.24998L146.558 8.24998C148.937 8.24998 150.369 10.8873 149.074 12.8832L84.0164 113.123Z"
                        fill="#4B4D56"
                      />
                      <path
                        d="M75.5175 113.116C74.335 114.94 71.665 114.94 70.4825 113.116L0.657669 5.38164C-0.635964 3.38567 0.79663 0.749992 3.17516 0.749992L142.825 0.749992C145.203 0.749992 146.636 3.38566 145.342 5.38163L75.5175 113.116Z"
                        fill={bg[index % bg.length]}
                      />
                    </svg>
                    <div className="name">{starship.name}</div>
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
