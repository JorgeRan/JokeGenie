import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_url = "https://v2.jokeapi.dev/joke/Any?";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/joke", async (req, res) => {
  try {
    let amount = "amount=" + req.body.numJokes;
    let language = "lang=" + req.body.lang;
    let type = "";
    if (req.body.type == "single") {
      type = "&type=single";
    } else if (req.body.type == "twopart") {
      type = "&type=twopart";
    }
    
    const response = await axios.get(
      API_url + amount + "&" + language + type
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    res.render("index.ejs", { error: "No jokes meet the selected criteria." });
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
