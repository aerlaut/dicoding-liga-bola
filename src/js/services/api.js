const CONN = {
  baseUrl: "http://api.football-data.org/v2",
  apiToken: "2c9cca3ed3464079a668de518425f553",
};

let fetchData = function (url) {
  return fetch(`${CONN.baseUrl}/${url}`, {
    headers: new Headers({
      "X-Auth-Token": CONN.apiToken,
    }),
  });
};

export { fetchData };
