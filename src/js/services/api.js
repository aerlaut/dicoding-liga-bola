const connection = {
  baseUrl: "http://api.football-data.org/v2",
  apiToken: "2c9cca3ed3464079a668de518425f553",
};

let getLeagueDetails = function () {
  const url = "";

  fetch(url)
    .then((res) => {
      return res.toJSON();
    })
    .catch((err) => console.log(err));
};

let getLeagueTeams = function (league_id) {
  const url = `${connection.baseUrl}/competitions/${league_id}/teams`;

  return fetch(url, {
    headers: new Headers({
      "X-Auth-Token": connection.apiToken,
    }),
  });
};

export { getLeagueDetails, getLeagueTeams };
