const SeatGrid = ({ layout, selectedSeats, onSeatToggle }) => {
  return (
    <div className="seats">
      {layout.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {row.map((seat) => {
            const isSelected = selectedSeats.includes(seat);

            return (
              <button
                key={seat}
                className={`seat ${isSelected ? "selected" : ""}`}
                aria-pressed={isSelected}
                onClick={() => onSeatToggle(seat)}
              >
                {seat}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;
