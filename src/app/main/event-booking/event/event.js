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
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    totalSeats: "",
    price: "",
    venue: "",
  });

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

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/v1/events", newEvent);
      setCreateModalOpen(false);
      setNewEvent({
        title: "",
        date: "",
        time:'',
        totalSeats: "",
        price: "",
        venue: "",
      });
      fetchEvents(); // Refresh events after creation
    } catch (err) {
      alert("Error creating event: " + err.message);
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Event Listing</h1>
      <div className="mb-4 text-right">
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Create Event
        </button>
      </div>
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
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Event</h2>
            <form onSubmit={handleCreateEvent}>
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Time</label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Seats</label>
                <input
                  type="number"
                  value={newEvent.totalSeats}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, totalSeats: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={newEvent.price}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, price: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Venue</label>
                <input
                  type="text"
                  value={newEvent.venue}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, venue: e.target.value })
                  }
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventListingPage;
