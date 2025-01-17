const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");

require("dotenv").config();

const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const PORT = 3001;

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

app.use(helmet());
app.use(xss());
app.use(cors());

const apiKey = process.env.RIOT_KEY;

app.get("/" , (req,res) => {
  res.send("Hello World")
})
app.get("/api/account/:playerName/:tag", async (req, res) => {
  const { playerName, tag } = req.params;

  try {
    const response = await axios.get(
      `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${tag}`,
      { headers: { "X-Riot-Token": apiKey } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
});

app.get("/api/active-game/:puuid", async (req, res) => {
  const { puuid } = req.params;

  try {
    const response = await axios.get(
      `https://eun1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`,
      {
        headers: { "X-Riot-Token": apiKey },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
});

app.get("/api/match-history/:puuid", async (req, res) => {
  const { puuid } = req.params;

  try {
    const response = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=30`,
      { headers: { "X-Riot-Token": apiKey } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
});

app.get("/api/match/:matchId", async (req, res) => {
  const { matchId } = req.params;

  try {
    const response = await axios.get(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`,
      { headers: { "X-Riot-Token": apiKey } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
});

app.get("/api/summoner/:puuid", async (req, res) => {
  const { puuid } = req.params;

  try {
    const response = await axios.get(
      `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      { headers: { "X-Riot-Token": apiKey } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
