const SeatGrid = ({ layout, selectedSeats, onSeatToggle }) => {
  return (
    <div className="seats">
      {layout.map((row, rowIndex) => (
        <div className="seat-row" key={`row-${rowIndex}`}>
          {row.map((seat) => {
            const isSelected = selectedSeats.includes(seat._id);

            return (
              <button
                key={seat._id}
                className={`seat ${isSelected ? "selected" : ""}`}
                aria-pressed={isSelected}
                onClick={() => onSeatToggle(seat)}
              >
                {seat.seat_number}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;