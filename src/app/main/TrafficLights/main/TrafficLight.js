import React, { useState, useEffect } from "react";
import axios from "axios";

const TrafficLight = () => {
  const [state, setState] = useState("red");

  useEffect(() => {
    // Define a function to fetch the traffic light state
    const fetchTrafficLightState = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/traffic-light"
        );
        setState(response.data.state);
      } catch (error) {
        console.error("Error fetching traffic light state:", error);
      }
    };

    // Fetch the state initially and then every 5 seconds
    fetchTrafficLightState();
    const interval = setInterval(fetchTrafficLightState, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: state === "red" ? "red" : "grey",
          width: 50,
          height: 50,
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          backgroundColor: state === "yellow" ? "yellow" : "grey",
          width: 50,
          height: 50,
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          backgroundColor: state === "green" ? "green" : "grey",
          width: 50,
          height: 50,
          borderRadius: "50%",
        }}
      />
      <button onClick={() => updateState("red")}>Red</button>
      <button onClick={() => updateState("yellow")}>Yellow</button>
      <button onClick={() => updateState("green")}>Green</button>
    </div>
  );
};

export default TrafficLight;
