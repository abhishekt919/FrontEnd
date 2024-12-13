import React, { useState } from "react";
import axios from "axios";

const BookingModal = ({ isOpen, onClose, eventId, userId, onSuccess }) => {
    const [seats, setSeats] = useState(1);
    const [error, setError] = useState(null);
  
    const handleBookingSubmit = async () => {
      try {
        await axios.post("http://localhost:4000/api/v1/booking", {
          userId,
          eventId,
          seats,
        });
        onSuccess(); // Notify parent of successful booking
      } catch (err) {
        setError(err.response?.data?.message || "Error booking seats.");
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Book Tickets</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Number of Seats:
            </label>
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              min="1"
              placeholder="Enter number of seats"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleBookingSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default BookingModal;