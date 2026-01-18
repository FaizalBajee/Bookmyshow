import React, { useState } from "react";
import "./Home.css";
import Section from "../../common/Section";
import BookingModel from "../../Component/BookingModel/BookingModel";

import poster1 from "../../Assets/image1.png";
import poster2 from "../../Assets/image2.png";
import poster3 from "../../Assets/image3.png";

const MovieCard = ({ title, poster, rating, onQuickView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="movie-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="poster-container">
        {hovered && (
          <button className="quick-view-btn" onClick={onQuickView}>
            🎥 Book Now
          </button>
        )}
        <img src={poster} alt={title} className="movie-poster" />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-rating">⭐ {rating}</p>
      </div>
    </div>
  );
};

//   if (!movie) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-btn" onClick={onClose}>
//           &times;
//         </button>

//         <img src={movie.poster} alt={movie.title} className="modal-poster" />
//         <h2>{movie.title}</h2>
//         <p>⭐ Rating: {movie.rating}</p>
//       </div>
//     </div>
//   );
// };

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = [
    { id: 1, title: "Jana Nayagan", poster: poster1, rating: 8.9 },
    { id: 2, title: "Leo", poster: poster2, rating: 8.2 },
    { id: 3, title: "Vikram", poster: poster3, rating: 8.7 },
  ];

  return (
    <Section id="movies">
      <div className="movies">
        <h1 className="header">Now Showing</h1>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
              onQuickView={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
        <BookingModel
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      </div>
    </Section>
  );
}
