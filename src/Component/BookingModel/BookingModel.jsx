import { useState, useMemo, useEffect } from "react";
import "./BookingModel.css";
import api from "../../common/axios/axios";

import { toggleSeatSelection, getExpiryTime } from "./booking.utils";
import SeatGrid from "./SeatGrid";
import { message } from "antd";

const BookingModal = ({ movie, screenID, onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatLayout, setSeatLayout] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const SEAT_PRICE_MAP = {
    Gold: 200,
    Silver: 150,
  };

  useEffect(() => {
    if (!screenID) return;
    fetchSeats();
  }, [screenID]);

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/movie/getSeat/?screenID=${screenID}`);

      if (res.data.success) {
        setSeatLayout(res.data.data.seatLayout);
      } else {
        messageApi.error("Failed to fetch seats");
      }
    } catch (error) {
      messageApi.error(
        error?.response?.data?.message || "Error fetching seats"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedSeatDetails = useMemo(() => {
    const seatMap = new Map(seatLayout.flat().map((seat) => [seat._id, seat]));

    return selectedSeats.map((id) => seatMap.get(id)).filter(Boolean);
  }, [seatLayout, selectedSeats]);

  const getSeatType = (seatNumber) => {
    if (seatNumber.startsWith("A")) return "Silver";
    return "Gold";
  };

  const totalAmount = useMemo(() => {
    return selectedSeatDetails.reduce((total, seat) => {
      const seatType = getSeatType(seat.seat_number);
      return total + (SEAT_PRICE_MAP[seatType] || 0);
    }, 0);
  }, [selectedSeatDetails]);

  if (!movie) return null;

  const handleSeatToggle = async (seat) => {
    const seats = seatLayout.flat().find((s) => s._id === seat._id);
    if (!seats) return;

    const isSelected = selectedSeats.includes(seat._id);

    try {
      if (!isSelected) {
        await lockSeat(seats);
      } else {
        await unlockSeat(seats);
      }

      setSelectedSeats((prev) => toggleSeatSelection(prev, seat));
    } catch (error) {
      console.log(`error handling : ${error}`);
    }
  };

  const lockSeat = async (seat) => {
    try {
      await api.post("/movie/lockSeat", {
        show_id: movie.id,
        seat_id: seat.seat_number,
        user_id: 1,
        expires_at: getExpiryTime(5),
      });
    } catch (error) {
      messageApi.error("Seat already locked by another user");
      throw error;
    }
  };

  const unlockSeat = async (seat) => {
    try {
      await api.post("/movie/unlockSeat", {
        show_id: movie.id,
        seat_id: seat.seat_number,
        user_id: 1,
      });
    } catch (error) {
      console.error("Unlock failed", error);
    }
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

  const handleClose = () => {
    setSelectedSeats([]);
    onClose();
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
        {loading ? (
          <p className="loading-text">Loading seats...</p>
        ) : (
          <SeatGrid
            layout={seatLayout}
            selectedSeats={selectedSeats}
            onSeatToggle={handleSeatToggle}
          />
        )}

        {/* Summary */}
        <div className="booking-summary">
          <p>
            Selected Seats:{" "}
            <strong>
              {selectedSeatDetails.length
                ? selectedSeatDetails.map((s) => s.seat_number).join(", ")
                : "None"}
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
