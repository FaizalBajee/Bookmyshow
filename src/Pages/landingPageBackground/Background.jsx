import "./Background.css";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";

export const Background = ({ heroCount }) => {
  const images = [image1, image2, image3];
  return (
    <img
      src={images[heroCount]}
      className="background"
      alt={`Slide ${heroCount + 1}`}
    />
  );
};
