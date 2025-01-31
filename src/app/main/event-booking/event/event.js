import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookedEventsByUser, getEvents } from "./../store/eventSlice";
import BookingModal from "./bookingModal";
import { userSession } from "app/store/userSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const EventListingTable = () => {
  const dispatch = useDispatch();
  const signInUser = useSelector(userSession);
  const [events, setEvents] = useState([]);
  const [bookedEvent, setBookedEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

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
  useEffect(() => {
    dispatch(getBookedEventsByUser())
      .then((result) => {
        setBookedEvent(result.payload || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [dispatch]);

  const handleBookTicket = (event) => {
    setSelectedEvent(event);
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

  // const handleAddEvent = () => {
  //   console.log("Add Event action triggered!");

  // };

  // const handleRefresh = () => {
  //   console.log("Refresh action triggered!");
  //   dispatch(getEvents())
  //     .then((result) => {
  //       setEvents(result.payload || []);
  //     })
  //     .catch(() => console.error("Failed to refresh events."));
  // };

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="container mx-auto p-4 relative">
      {events.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="px-4 py-2 border border-gray-300">Title</th>
                <th className="px-4 py-2 border border-gray-300">
                  Date & Time
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Total Seats
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Available Seats
                </th>
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
                  <td className="px-4 py-2 border border-gray-300">
                    {event.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(event.date).toLocaleDateString()} | {event.time}
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
                    {event.availableSeats > 0 ? (
                      <button
                        onClick={() => handleBookTicket(event)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Book Ticket
                      </button>
                    ) : (
                      <span className="text-gray-500">Sold Out</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg">No events available.</p>
      )}
      {selectedEvent && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          eventId={selectedEvent._id}
          userId={signInUser}
          availableSeats={selectedEvent.availableSeats}
          onSuccess={handleBookingSuccess}
        />
      )}
      {/* Speed Dial */}
      <div className="fixed bottom-4 right-4">
        <SpeedDial
          ariaLabel="Speed Dial Actions"
          icon={<SpeedDialIcon />}
          direction="up"
        >
          <SpeedDialAction
            icon={<EventIcon />}
            tooltipTitle="Booked Events"
            onClick={() => setOpen(true)}
          />
        </SpeedDial>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Booked Events</DialogTitle>
        <DialogContent>
          {bookedEvent.length > 0 ? (
           <div className="overflow-x-auto">
           <table className="table-auto w-full border-collapse border border-gray-200">
             <thead>
               <tr className="bg-gray-100">
                 <th className="border border-gray-300 px-4 py-2">Title</th>
                 <th className="border border-gray-300 px-4 py-2">Date</th>
                 <th className="border border-gray-300 px-4 py-2">Price</th>
                 <th className="border border-gray-300 px-4 py-2">Venue</th>
                 <th className="border border-gray-300 px-4 py-2">Number of seats booked</th>
                 <th className="border border-gray-300 px-4 py-2">Booked By</th>
               </tr>
             </thead>
             <tbody>
               {bookedEvent.map((event) => (
                 <tr key={event._id} className="hover:bg-gray-100">
                   <td className="border border-gray-300 px-4 py-2">{event.event.title}</td>
                   <td className="border border-gray-300 px-4 py-2">
                     {new Date(event.event.date).toLocaleDateString()}
                   </td>
                   <td className="border border-gray-300 px-4 py-2">{event.event.price}</td>
                   <td className="border border-gray-300 px-4 py-2">{event.event.venue}</td>
                   <td className="border border-gray-300 px-4 py-2">{event.seats}</td>
                   <td className="border border-gray-300 px-4 py-2">{event.user}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
          ) : (
            <p>No booked events</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventListingTable;
