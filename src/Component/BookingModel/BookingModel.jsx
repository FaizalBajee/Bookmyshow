import { useState, useMemo } from "react";
import "./BookingModel.css";

import { DEFAULT_SEAT_PRICE, SEAT_LAYOUT } from "./booking.constants";
import {
  toggleSeatSelection,
  calculateTotalAmount,
} from "./booking.utils";
import SeatGrid from "./SeatGrid";

const BookingModal = ({ movie, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

    const totalAmount = useMemo(
    () => calculateTotalAmount(selectedSeats.length, DEFAULT_SEAT_PRICE),
    [selectedSeats]
  );

  if (!movie) return null; 

  const handleSeatToggle = (seat) => {
    setSelectedSeats((prev) => toggleSeatSelection(prev, seat));
  };
  const handleClose = () => {
  setSelectedSeats([]);
  onClose();
};

  const handleConfirmBooking = () => {
    const bookingData = {
      movieId: movie.id,
      movieTitle: movie.title,
      seats: selectedSeats,
      totalAmount,
    };

    onConfirm?.(bookingData);
    handleClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          aria-label="Close booking modal"
          onClick={handleClose}
        >
          &times;
        </button>

        {/* Movie Info */}
        <div className="movie-info">
          <img src={movie.poster} alt={movie.title} />
          <div>
            <h2>{movie.title}</h2>
            <p>⭐ {movie.rating}</p>
          </div>
        </div>

        {/* Screen */}
        <div className="screen">SCREEN THIS WAY</div>

        {/* Seats */}
        <SeatGrid
          layout={SEAT_LAYOUT}
          selectedSeats={selectedSeats}
          onSeatToggle={handleSeatToggle}
        />

        {/* Summary */}
        <div className="booking-summary">
          <p>
            Selected Seats:{" "}
            <strong>
              {selectedSeats.length ? selectedSeats.join(", ") : "None"}
            </strong>
          </p>

          <p>
            Total Amount: <strong>₹{totalAmount}</strong>
          </p>

          <button
            className="confirm-btn"
            disabled={!selectedSeats.length}
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
