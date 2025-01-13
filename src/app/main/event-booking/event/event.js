import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "./../store/eventSlice";
import BookingModal from "./bookingModal";
import { userSession } from "app/store/userSlice";

const EventListingTable = () => {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(getEvents())
      .then((result) => {
        setEvents(result.payload || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.error("Failed to fetch events.");
      });
  }, [dispatch]);

  const handleBookTicket = (eventId) => {
    setSelectedEventId(eventId);
    setModalOpen(true);
  };

  const handleBookingSuccess = () => {
    setModalOpen(false);
    dispatch(getEvents())
      .then((result) => {
        setEvents(result.payload || []);
      })
      .catch(() => {
        console.error("Failed to refresh events.");
      });
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Event Listing</h1>
      {events.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="px-4 py-2 border border-gray-300">Title</th>
                <th className="px-4 py-2 border border-gray-300">Date & Time</th>
                <th className="px-4 py-2 border border-gray-300">Total Seats</th>
                <th className="px-4 py-2 border border-gray-300">Available Seats</th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
                <th className="px-4 py-2 border border-gray-300">Venue</th>
                <th className="px-4 py-2 border border-gray-300 text-center">
                  Action
                </th>
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
                  <td className="px-4 py-2 border border-gray-300">{event.title}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(event.date).toLocaleDateString()} | {event.time}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">{event.totalSeats}</td>
                  <td className="px-4 py-2 border border-gray-300">{event.availableSeats}</td>
                  <td className="px-4 py-2 border border-gray-300">{event.price}</td>
                  <td className="px-4 py-2 border border-gray-300">{event.venue}</td>
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
        onSuccess={handleBookingSuccess} // Handle booking success
      />
    </div>
  );
};


export default EventListingTable;
