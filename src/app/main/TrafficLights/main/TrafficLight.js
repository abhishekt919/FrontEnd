import React, { useState, useEffect } from "react";
import axios from "axios";

const Light = ({ color, timer }) => (
  <div style={{ textAlign: "center" }}>
    <div
      style={{
        backgroundColor: color,
        width: 50,
        height: 50,
        borderRadius: "50%",
        margin: "10px auto",
        border: "2px solid black",
      }}
    />
    {color === "green" && <p>{timer}s</p>}
  </div>
);

const TrafficLight = () => {
  const [lights, setLights] = useState({
    north: { color: "red", timer: 0 },
    south: { color: "red", timer: 0 },
    east: { color: "red", timer: 0 },
    west: { color: "red", timer: 0 },
  });

  const [activeDirection, setActiveDirection] = useState(null); // Track the currently active green light

  const fetchTrafficLightState = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/traffic-light");
      const apiLights = response.data;

      // Identify the green light direction
      const newActiveDirection = Object.keys(apiLights).find(
        (direction) => apiLights[direction] === "green"
      );

      // Update state only if the active green light has changed
      if (newActiveDirection !== activeDirection) {
        setActiveDirection(newActiveDirection);

        // Set the state with a new 15-second timer for the green light
        const updatedLights = Object.fromEntries(
          Object.entries(apiLights).map(([direction, color]) => [
            direction,
            { color, timer: color === "green" ? 15 : 0 },
          ])
        );
        setLights(updatedLights);
      }
    } catch (error) {
      console.error("Error fetching traffic light state:", error);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    const countdown = setInterval(() => {
      setLights((prevLights) => {
        const updatedLights = { ...prevLights };
        Object.keys(updatedLights).forEach((direction) => {
          if (updatedLights[direction].color === "green" && updatedLights[direction].timer > 0) {
            updatedLights[direction].timer -= 1;
          }
        });
        return updatedLights;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Fetch the traffic light state every 5 seconds
  useEffect(() => {
    fetchTrafficLightState(); // Fetch initial state
    const interval = setInterval(fetchTrafficLightState, 5000);

    return () => clearInterval(interval);
  }, [activeDirection]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>4-Way Traffic Light System</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {Object.entries(lights).map(([direction, { color, timer }]) => (
          <div key={direction}>
            <p>{direction.charAt(0).toUpperCase() + direction.slice(1)}</p>
            <Light color={color} timer={timer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficLight;
