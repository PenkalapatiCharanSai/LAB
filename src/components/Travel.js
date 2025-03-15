import { useState } from "react";
import axios from "axios";
import "./Travel.css";

function Travel() {
  const [formData, setFormData] = useState({
    user_id: "",
    user_name: "",
    travel_date: "",
    travel_day: "",
    location: "",
    user_experience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8008/adduserexperience", formData);
      alert("Travel Experience Added!");
      setFormData({
        user_id: "",
        user_name: "",
        travel_date: "",
        travel_day: "",
        location: "",
        user_experience: "",
      });
    } catch (error) {
      console.error("Error adding experience:", error);
      alert("Failed to add experience.");
    }
  };

  return (
    <div className="travel-container">
      <h1>Add Travel Experience</h1>
      <form onSubmit={handleSubmit} className="travel-form">
        <input type="number" name="user_id" placeholder="User ID" value={formData.user_id} onChange={handleChange} required />
        <input type="text" name="user_name" placeholder="Your Name" value={formData.user_name} onChange={handleChange} required />
        <input type="date" name="travel_date" value={formData.travel_date} onChange={handleChange} required />
        <input type="text" name="travel_day" placeholder="Day of Travel" value={formData.travel_day} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Travel Location" value={formData.location} onChange={handleChange} required />
        <textarea name="user_experience" placeholder="Describe your experience" value={formData.user_experience} onChange={handleChange} required />
        <button type="submit">Add Experience</button>
      </form>
    </div>
  );
}

export default Travel;
