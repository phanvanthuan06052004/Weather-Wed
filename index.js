import express from 'express';
import bodyParser from "body-parser";
import axios from 'axios';

const app = express();
const port = 3000;
const URLapi = "http://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("index", { content: null });
});

app.post("/", async (req, res) => {
    try {
        const cityName = req.body.city
        console.log("City name received from form:", cityName);
        const result = await axios.get(`${URLapi}${cityName}&APPID=${apiKey}&units=metric`);
        console.log(result.data);
        res.render("index", {
            content: result.data
        });
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.render("index", { content: null, error: "City not found. Please enter a valid city name." });
        } else {
            res.render("index", { content: null, error: "An error occurred while fetching the weather data." });
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
