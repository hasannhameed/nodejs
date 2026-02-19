const express = require("express");
const app = express();


app.get("/welcome/:username", (req, res) => {
  const username = req.params.username;

  const role = req.query.role;

  const userRole = role ? role : "User";

  res.send(`Welcome ${username}, your role is ${userRole}`);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});


app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
