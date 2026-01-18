export const toggleSeatSelection = (selectedSeats, seat) => {
  return selectedSeats.includes(seat)
    ? selectedSeats.filter((s) => s !== seat)
    : [...selectedSeats, seat];
};

export const calculateTotalAmount = (seatCount, price) => {
  return seatCount * price;
};
