import { Link } from "react-router-dom";
import React from "react";
import { useAllResults } from "../../hooks/hooks";

function Characters(props) {
  const [isLoading, info, error] = useAllResults(
    "https://swapi.dev/api/people/"
  );

  return (
    <div>
      <h1>star wars</h1>
      {isLoading && info.length === 0
        ? "loading..."
        : info.map((character) => (
            <p key={character.id}>
              <Link to={`/character/${character.id}`}>{character.name}</Link>
            </p>
          ))}
      {error !== undefined ? <p>{error}</p> : null}
    </div>
  );
}

export default Characters;

// const [characters, setCharacters] = useState([]);
// const [isLoading, setIsLoading] = useState(false);

// useEffect(() => {
//   setIsLoading(true);
//   axios
//     .get("https://swapi.dev/api/people/")
//     .then((res) => {
//       let charactersInfo = res.data.results;
//       charactersInfo = charactersInfo.map((character) => {
//         const id = getIdFromUrl(character.url);
//         Object.assign(character, { id: id });
//         return character;
//       });
//       setCharacters(charactersInfo);
//       setIsLoading(false);
//     })
//     .catch((err) => console.log("error!: ", err));
// }, []);
