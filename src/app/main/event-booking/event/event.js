import React, { useState, useEffect } from "react";
import axios from "axios";

const EventListingPage = () => {
  const [events, setEvents] = useState([]); // State to store event data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("http://localhost:4000/api/v1/events/events");
        setEvents(response.data); // Update events state
        console.log(response.data)
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message); // Capture and store error message
        setLoading(false); // Stop loading
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this runs only once

  // Handle loading and error states
  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error loading events: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">Event Listing</h1>
    {events.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="px-4 py-2 border border-gray-300">Title</th>
              <th className="px-4 py-2 border border-gray-300">Date</th>
              <th className="px-4 py-2 border border-gray-300">Total Seats</th>
              <th className="px-4 py-2 border border-gray-300">Available Seats</th>
              <th className="px-4 py-2 border border-gray-300">Price</th>
              <th className="px-4 py-2 border border-gray-300">Venue</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={event._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2 border border-gray-300">
                  {event.title}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {event.date}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {event.totalSeats}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {event.availableSeats}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {event.price}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {event.venue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-center text-lg">No events available.</p>
    )}
  </div>
  );
};

export default EventListingPage;
