const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8008;
const URI = "mongodb+srv://2211cs010459:2211cs010459@cluster0.jr6nrgb.mongodb.net/travel_experiences?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("MongoDB connection failed:", error));

const TravelSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  user_name: { type: String, required: true },
  travel_date: { type: Date, required: true },
  travel_day: { type: String, required: true },
  location: { type: String, required: true },
  user_experience: { type: String, required: true },
});

const Travel = mongoose.model("Travel", TravelSchema);

app.post("/adduserexperience", async (req, res) => {
  try {
    const newTravel = new Travel(req.body);
    await newTravel.save();
    res.status(201).json({ message: "Travel experience added" });
  } catch (error) {
    res.status(500).json({ error: "Error adding experience" });
  }
});

app.get("/gettravelers", async (req, res) => {
  try {
    const travelers = await Travel.find();
    res.json(travelers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.delete("/deleteexperience/:id", async (req, res) => {
  try {
    const deletedExperience = await Travel.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting experience" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
