import React, { useState, useEffect } from "react";
import axios from "axios";

const Light = ({ color }) => (
  <div
    style={{
      backgroundColor: color,
      width: 50,
      height: 50,
      borderRadius: "50%",
      margin: "10px",
    }}
  />
);

const TrafficLight = () => {
  const [lights, setLights] = useState({
    north: "red",
    south: "red",
    east: "red",
    west: "red"
  });

  useEffect(() => {
    const fetchTrafficLightState = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/traffic-light");
        console.log("Fetched State:", response.data.state);
        setLights(response.data);
      } catch (error) {
        console.error("Error fetching traffic light state:", error);
      }
    };

    fetchTrafficLightState();
    const interval = setInterval(fetchTrafficLightState, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>4-Way Traffic Light System</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", justifyItems: "center" }}>
        <div>
          <p>North</p>
          <Light color={lights.north || "green"} />
        </div>
        <div>
          <p>South</p>
          <Light color={lights.south || "green"} />
        </div>
        <div>
          <p>East</p>
          <Light color={lights.east || "green"} />
        </div>
        <div>
          <p>West</p>
          <Light color={lights.west || "green"} />
        </div>
      </div>
    </div>
  );
  
};

export default TrafficLight;
