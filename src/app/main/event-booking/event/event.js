import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingModal from "./bookingModal";
import { userSession } from "app/store/userSlice";
import { useSelector } from "react-redux";

const EventListingPage = () => {
    const signInUser = useSelector(userSession);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
  
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/v1/events/events"
        );
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchEvents();
    }, []);
  
    const handleBookTicket = (eventId) => {
      setSelectedEventId(eventId);
      setModalOpen(true);
    };
  
    const handleBookingSuccess = () => {
      setModalOpen(false);
      fetchEvents(); // Refresh events after successful booking
    };
  
    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error loading events: {error}</p>;
  
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
                  <th className="px-4 py-2 border border-gray-300">
                    Available Seats
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Price</th>
                  <th className="px-4 py-2 border border-gray-300">Venue</th>
                  <th className="px-4 py-2 border border-gray-300">Action</th>
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
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <button
                        onClick={() => handleBookTicket(event._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Book Ticket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-lg">No events available.</p>
        )}
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          eventId={selectedEventId}
          userId={signInUser}
          onSuccess={handleBookingSuccess} // Pass success handler
        />
      </div>
    );
  };
  

export default EventListingPage;
