const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Proxy server running...");
});

app.listen(5000, () => {
  console.log(`Proxy server running on 5000 ${5000}`);
});
