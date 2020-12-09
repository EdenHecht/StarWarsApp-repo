export function getIdFromUrl(url) {
  url = url[url.length - 1] === "/" ? url.substring(url, url.length - 1) : url;
  return url.substring(url.lastIndexOf("/") + 1);
}
