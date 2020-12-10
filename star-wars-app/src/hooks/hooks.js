import { useState, useEffect } from "react";
import axios from "axios";

import { getIdFromUrl } from "../utils/utils";

export function useAllResults(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [error, setError] = useState();
  const [nextPage, setNextPage] = useState(url);

  useEffect(() => {
    if (nextPage === null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      axios
        .get(nextPage)
        .then((res) => {
          let filmsInfo = res.data.results;
          filmsInfo = filmsInfo.map((film) => {
            const id = getIdFromUrl(film.url);
            Object.assign(film, { id: id });
            return film;
          });
          setInfo((prevArr) => [...prevArr, ...filmsInfo]);
          setNextPage(res.data.next);
        })
        .catch((err) => setError(err));
    }
  }, [nextPage]);
  return [isLoading, info, error];
}

export function useSpecificResult(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => setError(err));
  }, []);
  return [isLoading, info, error];
}
