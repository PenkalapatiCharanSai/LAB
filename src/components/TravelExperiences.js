import { useState, useEffect } from "react";
import axios from "axios";
import "./TravelExperience.css";

function TravelExperiences() {
  const [travelExperiences, setTravelExperiences] = useState([]);

  useEffect(() => {
    fetchTravelExperiences();
  }, []);

  const fetchTravelExperiences = async () => {
    try {
      const response = await axios.get("http://localhost:8008/gettravelers");
      setTravelExperiences(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await axios.delete(`http://localhost:8008/deleteexperience/${id}`);
        alert("Experience deleted successfully!");
        fetchTravelExperiences();
      } catch (error) {
        console.error("Error deleting experience:", error);
        alert("Error deleting experience.");
      }
    }
  };

  return (
    <div className="travel-exp-container">
      <h1>User's Travel Experiences</h1>
      <div className="travel-card-container">
        {travelExperiences.length > 0 ? (
          travelExperiences.map((exp) => (
            <div key={exp._id} className="travel-card">
              <h3>{exp.user_name}</h3>
              <p><strong>Location:</strong> {exp.location}</p>
              <p><strong>Travel Date:</strong> {new Date(exp.travel_date).toDateString()}</p>
              <p><strong>Day:</strong> {exp.travel_day}</p>
              <p><strong>Experience:</strong> {exp.user_experience}</p>
              <button className="delete-button" onClick={() => handleDelete(exp._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No user travel experiences available</p>
        )}
      </div>
    </div>
  );
}

export default TravelExperiences;
