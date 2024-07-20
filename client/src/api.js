import axios from 'axios';



export const getActiveGame = async (puuid) => {
  const response = await axios.get(
    `https://old-mate-server.vercel.app/api/active-game/${puuid}`
  );
  return response.data;
};

export const getAccount = async (playerName, tag) => {
  const response = await axios.get(
    `https://old-mate-server.vercel.app/api/account/${playerName}/${tag}`
  );
  return response.data;
};

export const getMatchHistory = async (puuid) => {
  const response = await axios.get(
    `https://old-mate-server.vercel.app/api/match-history/${puuid}`
  );
  console.log(response);
  return response.data;
};

export const getMatch = async (matchId) => {
  const response = await axios.get(
    `https://old-mate-server.vercel.app/api/match/${matchId}`
  );
  return response.data;
};

export const getSummoner = async (puuid) => {
  const response = await axios.get(
    `https://old-mate-server.vercel.app/api/summoner/${puuid}`
  );
  return response.data;
};