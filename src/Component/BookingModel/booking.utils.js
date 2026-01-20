export const toggleSeatSelection = (selectedSeats, seat) => {
  const seatId = seat._id;

  return selectedSeats.includes(seatId)
    ? selectedSeats.filter((id) => id !== seatId)
    : [...selectedSeats, seatId];
};

export const getExpiryTime = (minutes = 5) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
};