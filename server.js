const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8008;

const URI = "mongodb+srv://2211cs010459:2211cs010459@cluster0.jr6nrgb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


app.use(cors());
app.use(bodyParser.json());


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log(" MongoDB connection failed:", error));


const TravelSchema = mongoose.Schema({
    user_id: Number,
    user_name: String,
    travel_date: Date,
    travel_day: String,
    location: String,
    user_experience: String,
});

const Travel = mongoose.model("Travel", TravelSchema);


app.post('/adduserexperience', async (req, res) => {
    const { user_id, user_name, travel_date, travel_day, location, user_experience } = req.body;
    if (!user_id || !user_name || !travel_date || !travel_day || !location || !user_experience) {
        return res.status(422).json({ error: "Please fill all fields properly" });
    }
    try {
        const existingTravel = await Travel.findOne({ user_id });
        if (existingTravel) {
            return res.status(422).json({ error: "Traveler with the same ID already exists" });
        }
        const newTravel = new Travel({ user_id, user_name, travel_date, travel_day, location, user_experience });
        await newTravel.save();
        console.log(" New Traveler experience documented successfully");
        return res.status(201).json({ message: "User Traveler experience documented successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "error" });
    }
});


app.get('/gettravelers', async (req, res) => {
    try {
        const allTravelers = await Travel.find();
        return res.json(allTravelers);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'error' });
    }
});

app.get('/gettraveler/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const travelData = await Travel.findOne({ user_id });
        if (!travelData) {
            return res.status(404).json({ error: 'Traveler not found!' });
        }
        return res.json(travelData);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'error' });
    }
});


app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));

module.exports = Travel;
