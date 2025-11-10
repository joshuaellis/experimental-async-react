import express from "express";
const app = express();
const port = 8080;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/login", async (req, res) => {
  await fakeData.postLogin(req.query.delay || 0).then(() => {
    res.send(JSON.stringify({ status: "ok" }));
  });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
