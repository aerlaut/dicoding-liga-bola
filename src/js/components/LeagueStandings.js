import LeagueStandingsHtml from "html/containers/league-standings.html";

import StandingItem from "js/components/StandingItem";

customElements.define("standing-item", StandingItem);

export default class LeagueStandings extends HTMLElement {
  constructor() {
    super();

    // Fetch home page template
    this.classList.add("league-standing");

    this.data = {
      table: [
        {
          position: 1,
          team: {
            id: 64,
            name: "Liverpool FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
          },
          playedGames: 34,
          won: 30,
          draw: 2,
          lost: 2,
          points: 92,
          goalsFor: 75,
          goalsAgainst: 26,
          goalDifference: 49,
        },
        {
          position: 2,
          team: {
            id: 65,
            name: "Manchester City FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
          },
          playedGames: 34,
          won: 22,
          draw: 3,
          lost: 9,
          points: 69,
          goalsFor: 86,
          goalsAgainst: 34,
          goalDifference: 52,
        },
        {
          position: 3,
          team: {
            id: 61,
            name: "Chelsea FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
          },
          playedGames: 34,
          won: 18,
          draw: 6,
          lost: 10,
          points: 60,
          goalsFor: 63,
          goalsAgainst: 46,
          goalDifference: 17,
        },
        {
          position: 4,
          team: {
            id: 338,
            name: "Leicester City FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg",
          },
          playedGames: 34,
          won: 17,
          draw: 8,
          lost: 9,
          points: 59,
          goalsFor: 64,
          goalsAgainst: 32,
          goalDifference: 32,
        },
        {
          position: 5,
          team: {
            id: 66,
            name: "Manchester United FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
          },
          playedGames: 34,
          won: 16,
          draw: 10,
          lost: 8,
          points: 58,
          goalsFor: 59,
          goalsAgainst: 33,
          goalDifference: 26,
        },
        {
          position: 6,
          team: {
            id: 76,
            name: "Wolverhampton Wanderers FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
          },
          playedGames: 34,
          won: 13,
          draw: 13,
          lost: 8,
          points: 52,
          goalsFor: 45,
          goalsAgainst: 37,
          goalDifference: 8,
        },
        {
          position: 7,
          team: {
            id: 356,
            name: "Sheffield United FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/9/9c/Sheffield_United_FC_logo.svg",
          },
          playedGames: 34,
          won: 13,
          draw: 12,
          lost: 9,
          points: 51,
          goalsFor: 35,
          goalsAgainst: 33,
          goalDifference: 2,
        },
        {
          position: 8,
          team: {
            id: 57,
            name: "Arsenal FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
          },
          playedGames: 34,
          won: 12,
          draw: 14,
          lost: 8,
          points: 50,
          goalsFor: 50,
          goalsAgainst: 42,
          goalDifference: 8,
        },
        {
          position: 9,
          team: {
            id: 73,
            name: "Tottenham Hotspur FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
          },
          playedGames: 34,
          won: 13,
          draw: 10,
          lost: 11,
          points: 49,
          goalsFor: 52,
          goalsAgainst: 44,
          goalDifference: 8,
        },
        {
          position: 10,
          team: {
            id: 328,
            name: "Burnley FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/6/62/Burnley_F.C._Logo.svg",
          },
          playedGames: 34,
          won: 14,
          draw: 7,
          lost: 13,
          points: 49,
          goalsFor: 38,
          goalsAgainst: 46,
          goalDifference: -8,
        },
        {
          position: 11,
          team: {
            id: 62,
            name: "Everton FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
          },
          playedGames: 34,
          won: 12,
          draw: 9,
          lost: 13,
          points: 45,
          goalsFor: 41,
          goalsAgainst: 49,
          goalDifference: -8,
        },
        {
          position: 12,
          team: {
            id: 340,
            name: "Southampton FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton.svg",
          },
          playedGames: 34,
          won: 13,
          draw: 5,
          lost: 16,
          points: 44,
          goalsFor: 43,
          goalsAgainst: 56,
          goalDifference: -13,
        },
        {
          position: 13,
          team: {
            id: 67,
            name: "Newcastle United FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
          },
          playedGames: 34,
          won: 11,
          draw: 10,
          lost: 13,
          points: 43,
          goalsFor: 35,
          goalsAgainst: 50,
          goalDifference: -15,
        },
        {
          position: 14,
          team: {
            id: 354,
            name: "Crystal Palace FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/0/0c/Crystal_Palace_FC_logo.svg",
          },
          playedGames: 34,
          won: 11,
          draw: 9,
          lost: 14,
          points: 42,
          goalsFor: 30,
          goalsAgainst: 43,
          goalDifference: -13,
        },
        {
          position: 15,
          team: {
            id: 397,
            name: "Brighton & Hove Albion FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg",
          },
          playedGames: 34,
          won: 8,
          draw: 12,
          lost: 14,
          points: 36,
          goalsFor: 36,
          goalsAgainst: 47,
          goalDifference: -11,
        },
        {
          position: 16,
          team: {
            id: 563,
            name: "West Ham United FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
          },
          playedGames: 34,
          won: 8,
          draw: 7,
          lost: 19,
          points: 31,
          goalsFor: 40,
          goalsAgainst: 59,
          goalDifference: -19,
        },
        {
          position: 17,
          team: {
            id: 346,
            name: "Watford FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/e/e2/Watford.svg",
          },
          playedGames: 34,
          won: 7,
          draw: 10,
          lost: 17,
          points: 31,
          goalsFor: 31,
          goalsAgainst: 53,
          goalDifference: -22,
        },
        {
          position: 18,
          team: {
            id: 1044,
            name: "AFC Bournemouth",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg",
          },
          playedGames: 34,
          won: 7,
          draw: 7,
          lost: 20,
          points: 28,
          goalsFor: 32,
          goalsAgainst: 59,
          goalDifference: -27,
        },
        {
          position: 19,
          team: {
            id: 58,
            name: "Aston Villa FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/de/9/9f/Aston_Villa_logo.svg",
          },
          playedGames: 34,
          won: 7,
          draw: 6,
          lost: 21,
          points: 27,
          goalsFor: 36,
          goalsAgainst: 65,
          goalDifference: -29,
        },
        {
          position: 20,
          team: {
            id: 68,
            name: "Norwich City FC",
            crestUrl:
              "https://upload.wikimedia.org/wikipedia/en/8/8c/Norwich_City.svg",
          },
          playedGames: 34,
          won: 5,
          draw: 6,
          lost: 23,
          points: 21,
          goalsFor: 26,
          goalsAgainst: 63,
          goalDifference: -37,
        },
      ],
    };
  }

  connectedCallback() {
    // Load home page

    this.data["table"].forEach((d) => {
      let standing = new StandingItem();
      standing.data = d;
      this.append(standing);
    });
  }
}
