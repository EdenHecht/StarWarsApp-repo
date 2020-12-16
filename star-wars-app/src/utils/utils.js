export function getIdFromUrl(url) {
  url = url[url.length - 1] === "/" ? url.substring(url, url.length - 1) : url;
  return url.substring(url.lastIndexOf("/") + 1);
}

export function showFirstResults(from, keyName, mapToSearch) {
  return from[keyName].slice(0, 3).map((resultUrl) => {
    const resultID = getIdFromUrl(resultUrl);
    return mapToSearch[resultID];
  });
}
