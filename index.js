import express from 'express';
import dotenv from 'dotenv';
import data from './data.js'

dotenv.config();
const app = express();

const URL = process.env.URL;
const API_KEY = process.env.API_KEY;

app.use(express.json());
//inclueir archivos css
app.use(express.static('public'))



app.set('views', './views')
app.set('view engine', 'pug')


app.get('/', async (req, res) => {
    const data = await ((await fetch(`${URL}?api_key=${API_KEY}`)).json())
    let datos = data.near_earth_objects["2023-07-10"].map(element => {
        return {
            id: element.id,
            name: element.name,
            diameter: element.estimated_diameter.kilometers.estimated_diameter_max,
            velocity: element.close_approach_data[0].relative_velocity.kilometers_per_hour,
            isDangerous: element.is_potentially_hazardous_asteroid ? "Si" : "No",
            orbiting_body: element.close_approach_data[0].orbiting_body == "Earth" ? "Tierra" : element.close_approach_data[0].orbiting_body
        }
    });
    res.render('index', { datos, fecha: "2023-07-10", cantidad: datos.length })
});

app.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`);
});